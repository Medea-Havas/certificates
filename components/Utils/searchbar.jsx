import { Box } from '@mui/material';
import {
  GridCsvExportOptions,
  GridCsvExportMenuItem,
  GridToolbarExportContainer,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import styles from './Searchbar.module.css';

export default function QuickSearchToolbar() {
  return (
    <Box
      className={styles.tableHeader}
      sx={{
        p: 2
      }}
    >
      <GridToolbarQuickFilter
        className={styles.gridTool}
        placeholder='Buscar...'
        quickFilterParser={searchInput =>
          searchInput
            .split(',')
            .map(value => value.trim())
            .filter(value => value !== '')
        }
      />
      <GridToolbarExport
        variant='outlined'
        csvOptions={{
          fileName: 'certificados-medea',
          delimiter: ',',
          utf8WithBom: true
        }}
      />
    </Box>
  );
}

const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
  <GridToolbarExportContainer {...other}>
    <GridCsvExportMenuItem options={csvOptions} />
  </GridToolbarExportContainer>
);
