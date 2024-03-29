export interface DialogData {
  component: any;
  data?: any;
  params: {
    header?: string;
    width?: string;
    height?: string;
    contentStyle?: any;
    closable?: boolean;
    showHeader?: boolean;
    baseZIndex?: number;
    maximizable?: boolean;
    accept?: Function;
    reject?: Function;
    responsive?: boolean;
    breakpoints?: any;
    position?: any;
    dismissableMask?: boolean;
  };
}
