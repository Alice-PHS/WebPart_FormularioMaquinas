package com.phsbrasil.formulariomaquinas.MicrosoftGraph;

import com.microsoft.graph.models.FieldValueSet;
import com.microsoft.graph.models.ListItem;
import com.microsoft.graph.models.ListItemCollectionResponse;
import com.microsoft.graph.serviceclient.GraphServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Repository
public class GraphRepository {

    @Autowired
    private GraphServiceClient graphClient;

    // ==========================================
    // READ (Dinâmico e com Cache por Lista)
    // ==========================================
    @Cacheable(value = "sharepoint_lists", key = "#listId")
    public List<Map<String, Object>> getListItems(String siteId, String listId, String selectFields) {
        ListItemCollectionResponse response = graphClient.sites()
                .bySiteId(siteId).lists().byListId(listId).items()
                .get(requestConfig -> {
                    String expandQuery = selectFields != null && !selectFields.isEmpty()
                            ? "fields($select=" + selectFields + ")"
                            : "fields";
                    requestConfig.queryParameters.expand = new String[]{expandQuery};
                });

        if (response == null || response.getValue() == null) return List.of();

        return response.getValue().stream()
                .filter(item -> item.getFields() != null && item.getFields().getAdditionalData() != null)
                .map(item -> {
                    Map<String, Object> data = item.getFields().getAdditionalData();
                    data.put("Id", item.getId());
                    return data;
                })
                .collect(Collectors.toList());
    }

    // ==========================================
    // READ ÚNICO (Dinâmico)
    // ==========================================
    public Map<String, Object> getListItem(String siteId, String listId, String itemId, String selectFields) {
        ListItem response = graphClient.sites()
                .bySiteId(siteId)
                .lists()
                .byListId(listId)
                .items()
                .byListItemId(itemId)
                .get(requestConfig -> {
                    String expandQuery = selectFields != null && !selectFields.isEmpty()
                            ? "fields($select=" + selectFields + ")"
                            : "fields";
                    requestConfig.queryParameters.expand = new String[]{expandQuery};
                });

        if (response != null && response.getFields() != null) {
            return response.getFields().getAdditionalData();
        }
        return null;
    }

    // ==========================================
    // CREATE / UPDATE / DELETE genéricos
    // (Limpam o cache apenas da lista que foi alterada)
    // ==========================================
    @CacheEvict(value = "sharepoint_lists", key = "#listId")
    public Map<String, Object> createListItem(String siteId, String listId, Map<String, Object> itemData) {
        ListItem newItem = new ListItem();
        FieldValueSet fields = new FieldValueSet();
        fields.setAdditionalData(itemData);
        newItem.setFields(fields);

        ListItem createdItem = graphClient.sites().bySiteId(siteId).lists().byListId(listId).items().post(newItem);
        return (createdItem != null && createdItem.getFields() != null) ? createdItem.getFields().getAdditionalData() : null;
    }

    @CacheEvict(value = "sharepoint_lists", key = "#listId")
    public Map<String, Object> updateListItem(String siteId, String listId, String itemId, Map<String, Object> itemData) {
        com.microsoft.graph.models.FieldValueSet fieldsToUpdate = new com.microsoft.graph.models.FieldValueSet();
        fieldsToUpdate.setAdditionalData(itemData);

        com.microsoft.graph.models.FieldValueSet updatedFields = graphClient.sites()
                .bySiteId(siteId).lists().byListId(listId).items().byListItemId(itemId)
                .fields().patch(fieldsToUpdate);

        return updatedFields != null ? updatedFields.getAdditionalData() : null;
    }

    @CacheEvict(value = "sharepoint_lists", key = "#listId")
    public void deleteListItem(String siteId, String listId, String itemId) {
        graphClient.sites()
                .bySiteId(siteId).lists().byListId(listId).items().byListItemId(itemId)
                .delete();
    }

    // updateListItem e deleteListItem seguem a mesma lógica do @CacheEvict com key = "#listId"
}