import { CSSProperties } from 'react';

export type FormTheme = {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryLighter: string;
  alertBg: string;
  alertBorder: string;
  alertText: string;
  alertTitle: string;
};

export const themes: Record<string, FormTheme> = {
  inclusao: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryLight: '#eff6ff',
    primaryLighter: '#dbeafe',
    alertBg: '#fffbeb',
    alertBorder: '#f59e0b',
    alertText: '#92400e',
    alertTitle: '#78350f',
  },
  exclusao: {
    primary: '#dc2626',
    primaryHover: '#b91c1c',
    primaryLight: '#fef2f2',
    primaryLighter: '#fecaca',
    alertBg: '#fffbeb',
    alertBorder: '#f59e0b',
    alertText: '#92400e',
    alertTitle: '#78350f',
  },
  substituicao: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryLight: '#eff6ff',
    primaryLighter: '#dbeafe',
    alertBg: '#fffbeb',
    alertBorder: '#f59e0b',
    alertText: '#92400e',
    alertTitle: '#78350f',
  },
  novoUsuario: {
    primary: '#9333ea',
    primaryHover: '#7e22ce',
    primaryLight: '#faf5ff',
    primaryLighter: '#e9d5ff',
    alertBg: '#fffbeb',
    alertBorder: '#f59e0b',
    alertText: '#92400e',
    alertTitle: '#78350f',
  },
};

export const makeStyles = (theme: FormTheme) => ({
  // PAGE
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '2rem 1rem',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    boxSizing: 'border-box',
  } as CSSProperties,

  container: {
    maxWidth: '800px',
    margin: '0 auto',
  } as CSSProperties,

  // HEADER
  pageHeader: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    flexWrap: 'wrap' as const,
    gap: '1rem',
  } as CSSProperties,

  brandName: {
    fontSize: '22px',
    fontWeight: 800,
    color: theme.primary,
    margin: 0,
    letterSpacing: '-0.5px',
  } as CSSProperties,

  brandSub: {
    fontSize: '11px',
    fontWeight: 500,
    color: '#94a3b8',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    marginTop: '2px',
  } as CSSProperties,

  stepBadge: {
    fontSize: '13px',
    color: '#94a3b8',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '999px',
    padding: '4px 14px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,

  // PROGRESS
  progressTrack: {
    width: '100%',
    height: '8px',
    background: '#e2e8f0',
    borderRadius: '999px',
    marginBottom: '2rem',
    overflow: 'hidden',
  } as CSSProperties,

  // CARD
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  } as CSSProperties,

  cardBody: {
    padding: '2.5rem',
  } as CSSProperties,

  cardFooter: {
    background: '#f8fafc',
    borderTop: '1px solid #f1f5f9',
    padding: '1rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,

  // ALERT BOX
  alertBox: {
    background: theme.alertBg,
    borderLeft: `4px solid ${theme.alertBorder}`,
    borderRadius: '0 10px 10px 0',
    padding: '1.25rem 1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
  } as CSSProperties,

  alertTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: theme.alertTitle,
    marginBottom: '6px',
    marginTop: 0,
  } as CSSProperties,

  alertText: {
    fontSize: '13px',
    color: theme.alertText,
    lineHeight: 1.65,
    margin: 0,
  } as CSSProperties,

  // SECTION TITLE
  sectionTitle: {
    fontSize: '19px',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '4px',
    marginTop: 0,
  } as CSSProperties,

  sectionSub: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '1.5rem',
    display: 'block',
  } as CSSProperties,

  // QUESTION GROUP
  group: {
    marginBottom: '1.5rem',
  } as CSSProperties,

  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px',
  } as CSSProperties,

  helpText: {
    display: 'block',
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '6px',
  } as CSSProperties,

  // INPUTS
  input: {
    display: 'block',
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1e293b',
    background: '#fff',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s, box-shadow 0.15s',
    outline: 'none',
  } as CSSProperties,

  textarea: {
    display: 'block',
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1e293b',
    background: '#fff',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    outline: 'none',
  } as CSSProperties,

  select: {
    display: 'block',
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1e293b',
    background: '#fff',
    boxSizing: 'border-box' as const,
    outline: 'none',
    cursor: 'pointer',
  } as CSSProperties,

  // RADIO OPTIONS (styled cards)
  radioCard: (selected: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    border: selected ? `2px solid ${theme.primary}` : '1px solid #e2e8f0',
    borderRadius: '10px',
    cursor: 'pointer',
    background: selected ? theme.primaryLight : '#fff',
    transition: 'all 0.15s',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: selected ? theme.primary : '#374151',
    gap: '10px',
  }),

  // BUTTONS
  btnPrev: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 20px',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'color 0.15s, background 0.15s',
  } as CSSProperties,

  btnNext: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 24px',
    border: 'none',
    background: theme.primary,
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: `0 2px 8px ${theme.primary}55`,
    transition: 'background 0.15s, box-shadow 0.15s',
  } as CSSProperties,

  btnSubmit: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 28px',
    border: 'none',
    background: '#16a34a',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 2px 8px #16a34a55',
    transition: 'background 0.15s',
  } as CSSProperties,

  // ADD MORE BUTTON (dashed)
  btnAddMore: {
    width: '100%',
    padding: '16px',
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.15s',
    marginTop: '1rem',
  } as CSSProperties,

  // ITEM CARD (for lists of machines, users, etc.)
  itemCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  } as CSSProperties,

  itemCardHeader: {
    background: '#f8fafc',
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as CSSProperties,

  itemCardBody: {
    padding: '16px',
  } as CSSProperties,

  // GRID
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  } as CSSProperties,

  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
  } as CSSProperties,

  // ERROR
  errorBanner: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as CSSProperties,

  // REVIEW CARD (last step)
  reviewBox: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    overflow: 'hidden',
    fontSize: '14px',
  } as CSSProperties,

  reviewHeader: {
    background: '#f8fafc',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  } as CSSProperties,

  reviewLabel: {
    display: 'block',
    fontSize: '11px',
    color: '#94a3b8',
    marginBottom: '2px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as CSSProperties,

  reviewValue: {
    fontWeight: 700,
    color: '#1e293b',
  } as CSSProperties,

  // HELP FOOTER
  helpFooter: {
    marginTop: '2rem',
    textAlign: 'center' as const,
    fontSize: '13px',
    color: '#94a3b8',
  } as CSSProperties,

  // TOGGLE
  toggleBtn: (active: boolean, color?: string): CSSProperties => ({
    flex: 1,
    padding: '10px 16px',
    border: active ? `2px solid ${color || theme.primary}` : '1px solid #e2e8f0',
    borderRadius: '8px',
    background: active ? (color ? color + '15' : theme.primaryLight) : '#fff',
    color: active ? (color || theme.primary) : '#64748b',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),

  // ICON BUTTON
  iconBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#94a3b8',
    padding: '4px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    transition: 'color 0.15s, background 0.15s',
  } as CSSProperties,
});
