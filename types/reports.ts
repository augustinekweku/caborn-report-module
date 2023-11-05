export enum SUMMARY_STATUS {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  NEUTRAL = "neutral",
}
export type EmissionData = {
  emissions: string;
  name: string;
  status: SUMMARY_STATUS;
  id: string;
  period: string;
};

export type EmissionHistoryData = {
  id: string;
  name: string;
  data: EmissionData[];
  value: {
    data: EmissionData[];
  };
};
export enum ReportSectionType {
  SINGLE = 1,
  DOUBLE = 2,
}

export enum ReportWidgetType {
  Text = "text",
  IMAGE = "image",
  BAR_CHART = "bar_chart",
  PIE_CHART = "pie_chart",
  LINE_CHART = "line_chart",
}

export type ReportSection = {
  id: string;
  title: string;
  subtitle: string;
  type: ReportSectionType;
  widgets: ReportWidget[];
};

export enum WidgetType {
  TEXT = "text",
  IMAGE = "image",
  BAR_CHART = "bar",
  PIE_CHART = "pie",
  LINE_CHART = "line",
  EMPTY = "empty",
}

export type ReportWidget = {
  type: WidgetType;
  data: {
    chartData?: EmissionHistoryData | null;
    text?: string;
  };
};

export const CHART_TYPE_DROPDOWN_OPTIONS = [
  {
    label: "Bar Chart",
    value: WidgetType.BAR_CHART,
  },
  {
    label: "Line Chart",
    value: WidgetType.LINE_CHART,
  },
  {
    label: "Pie Chart",
    value: WidgetType.PIE_CHART,
  },
];
