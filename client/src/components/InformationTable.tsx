import { InformationTableProps } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const InformationTable = ({ companies }: InformationTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow
          sx={{
            "& th": {
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              border: "1px solid black",
            },
          }}
        >
          <TableCell>Company</TableCell>
          {companies[0].criteria.map((criterion, index) => (
            <TableCell
              key={index}
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              {criterion.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {companies.map((company, companyIndex) => (
          <TableRow
            key={companyIndex}
            sx={{
              "& td": {
                textAlign: "center",
                border: "1px solid black",
              },
            }}
          >
            <TableCell>{company.label}</TableCell>
            <TableCell>{company.revenue}</TableCell>
            <TableCell>{company.revenue_percentage_change}</TableCell>
            <TableCell>{company.profits}</TableCell>
            <TableCell>{company.profits_percentage_change}</TableCell>
            <TableCell>{company.assets}</TableCell>
            <TableCell>{company.employees}</TableCell>
            <TableCell>{company.change_in_rank}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InformationTable;
