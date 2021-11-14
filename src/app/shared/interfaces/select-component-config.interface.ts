export interface SelectComponentConfig<T> {
    fieldPlaceholder: string,
    valueDataKey: string,
    displayDataKeys: string[],
    groupByType?: {type: string, fieldData: T | string},
}