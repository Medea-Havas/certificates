import { Box } from '@mui/material';
import {
  GridCsvExportMenuItem,
  GridToolbarExportContainer,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import styles from './StudentsSectionHome.module.css';

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
      <GridToolbarExport variant='outlined' />
    </Box>
  );
}

const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
  <GridToolbarExportContainer {...other}>
    <GridCsvExportMenuItem options={csvOptions} />
  </GridToolbarExportContainer>
);
