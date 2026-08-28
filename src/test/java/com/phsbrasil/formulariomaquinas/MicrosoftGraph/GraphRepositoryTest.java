package com.phsbrasil.formulariomaquinas.MicrosoftGraph;

import com.microsoft.graph.models.FieldValueSet;
import com.microsoft.graph.models.ListItem;
import com.microsoft.graph.models.ListItemCollectionResponse;
import com.microsoft.graph.serviceclient.GraphServiceClient;
import com.microsoft.graph.sites.SitesRequestBuilder;
import com.microsoft.graph.sites.item.SiteItemRequestBuilder;
import com.microsoft.graph.sites.item.lists.ListsRequestBuilder;
import com.microsoft.graph.sites.item.lists.item.ListItemRequestBuilder;
import com.microsoft.graph.sites.item.lists.item.items.ItemsRequestBuilder;
import com.microsoft.graph.sites.item.lists.item.items.item.ListItemItemRequestBuilder;
import com.microsoft.graph.sites.item.lists.item.items.item.fields.FieldsRequestBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GraphRepositoryTest {

    private static final String SITE_ID = "site-1";
    private static final String LIST_ID = "list-1";
    private static final String ITEM_ID = "item-1";

    @Mock
    private GraphServiceClient graphClient;
    @Mock
    private SitesRequestBuilder sitesRequestBuilder;
    @Mock
    private SiteItemRequestBuilder siteItemRequestBuilder;
    @Mock
    private ListsRequestBuilder listsRequestBuilder;
    @Mock
    private ListItemRequestBuilder listRequestBuilder;
    @Mock
    private ItemsRequestBuilder itemsRequestBuilder;
    @Mock
    private ListItemItemRequestBuilder listItemItemRequestBuilder;
    @Mock
    private FieldsRequestBuilder fieldsRequestBuilder;

    @InjectMocks
    private GraphRepository graphRepository;

    @BeforeEach
    void setUp() {
        when(graphClient.sites()).thenReturn(sitesRequestBuilder);
        when(sitesRequestBuilder.bySiteId(SITE_ID)).thenReturn(siteItemRequestBuilder);
        when(siteItemRequestBuilder.lists()).thenReturn(listsRequestBuilder);
        when(listsRequestBuilder.byListId(LIST_ID)).thenReturn(listRequestBuilder);
        when(listRequestBuilder.items()).thenReturn(itemsRequestBuilder);
    }

    private void stubListItem() {
        when(itemsRequestBuilder.byListItemId(ITEM_ID)).thenReturn(listItemItemRequestBuilder);
    }

    @Test
    void getListItems_returnsMappedItemsFromResponse() {
        FieldValueSet fields = new FieldValueSet();
        fields.setAdditionalData(new HashMap<>(Map.of("Title", "Test")));
        ListItem item = new ListItem();
        item.setId("1");
        item.setFields(fields);

        ListItemCollectionResponse response = new ListItemCollectionResponse();
        response.setValue(List.of(item));

        when(itemsRequestBuilder.get(any())).thenReturn(response);

        List<Map<String, Object>> result = graphRepository.getListItems(SITE_ID, LIST_ID, "Title");

        assertThat(result).hasSize(1);
        assertThat(result.get(0)).containsEntry("Title", "Test").containsEntry("Id", "1");
    }

    @Test
    void getListItems_returnsEmptyList_whenResponseIsNull() {
        when(itemsRequestBuilder.get(any())).thenReturn(null);

        List<Map<String, Object>> result = graphRepository.getListItems(SITE_ID, LIST_ID, null);

        assertThat(result).isEmpty();
    }

    @Test
    void getListItems_filtersOutItemsWithoutFields() {
        ListItem itemWithoutFields = new ListItem();
        itemWithoutFields.setId("2");

        ListItemCollectionResponse response = new ListItemCollectionResponse();
        response.setValue(List.of(itemWithoutFields));

        when(itemsRequestBuilder.get(any())).thenReturn(response);

        List<Map<String, Object>> result = graphRepository.getListItems(SITE_ID, LIST_ID, null);

        assertThat(result).isEmpty();
    }

    @Test
    void getListItem_returnsFieldsAdditionalData() {
        FieldValueSet fields = new FieldValueSet();
        fields.setAdditionalData(new HashMap<>(Map.of("Title", "Hello")));
        ListItem item = new ListItem();
        item.setFields(fields);

        stubListItem();
        when(listItemItemRequestBuilder.get(any())).thenReturn(item);

        Map<String, Object> result = graphRepository.getListItem(SITE_ID, LIST_ID, ITEM_ID, "Title");

        assertThat(result).containsEntry("Title", "Hello");
    }

    @Test
    void getListItem_returnsNull_whenItemHasNoFields() {
        stubListItem();
        when(listItemItemRequestBuilder.get(any())).thenReturn(new ListItem());

        Map<String, Object> result = graphRepository.getListItem(SITE_ID, LIST_ID, ITEM_ID, null);

        assertThat(result).isNull();
    }

    @Test
    void createListItem_returnsCreatedItemFields() {
        FieldValueSet createdFields = new FieldValueSet();
        createdFields.setAdditionalData(new HashMap<>(Map.of("Title", "New")));
        ListItem createdItem = new ListItem();
        createdItem.setFields(createdFields);

        when(itemsRequestBuilder.post(any(ListItem.class))).thenReturn(createdItem);

        Map<String, Object> result = graphRepository.createListItem(SITE_ID, LIST_ID, Map.of("Title", "New"));

        assertThat(result).containsEntry("Title", "New");
    }

    @Test
    void updateListItem_returnsUpdatedFields() {
        stubListItem();
        when(listItemItemRequestBuilder.fields()).thenReturn(fieldsRequestBuilder);

        FieldValueSet updated = new FieldValueSet();
        updated.setAdditionalData(new HashMap<>(Map.of("Title", "Updated")));

        when(fieldsRequestBuilder.patch(any(FieldValueSet.class))).thenReturn(updated);

        Map<String, Object> result = graphRepository.updateListItem(SITE_ID, LIST_ID, ITEM_ID, Map.of("Title", "Updated"));

        assertThat(result).containsEntry("Title", "Updated");
    }

    @Test
    void deleteListItem_callsDeleteOnTargetItem() {
        stubListItem();

        graphRepository.deleteListItem(SITE_ID, LIST_ID, ITEM_ID);

        verify(listItemItemRequestBuilder).delete();
    }
}
