import { isDefined } from '@js/core/utils/type';
// @ts-expect-error
import { columnsControllerModule } from '@js/ui/grid_core/ui.grid_core.columns_controller';
import treeListCore from './module_core';

export const ColumnsController = columnsControllerModule.controllers.columns.inherit((function () {
  return {
    _getFirstItems(dataSourceAdapter) {
      return this.callBase(dataSourceAdapter).map((node) => node.data);
    },
    getFirstDataColumnIndex() {
      const visibleColumns = this.getVisibleColumns();
      const visibleColumnsLength = visibleColumns.length;
      let firstDataColumnIndex = 0;

      for (let i = 0; i <= visibleColumnsLength - 1; i++) {
        if (!isDefined(visibleColumns[i].command)) {
          firstDataColumnIndex = visibleColumns[i].index;
          break;
        }
      }

      return firstDataColumnIndex;
    },
  };
})());

treeListCore.registerModule('columns', {
  defaultOptions: columnsControllerModule.defaultOptions,
  controllers: {
    columns: ColumnsController,
  },
});