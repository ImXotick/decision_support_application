import { AHPTableProps } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const AHPTable = ({ data, table, onInputChange }: AHPTableProps) => {
  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    onInputChange(rowIndex, colIndex, value);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {data.map((header) => (
              <TableCell key={header.id}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, row_index) => (
            <TableRow key={row.id}>
              <TableCell>{row.label}</TableCell>
              {data.map((_, col_index) => (
                <TableCell key={`${row_index}-${col_index}`}>
                  <TextField
                    value={table?.[row_index]?.[col_index] ?? ""}
                    variant="outlined"
                    size="small"
                    onChange={(e) =>
                      handleChange(row_index, col_index, e.target.value)
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AHPTable;
