import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import type { ITopMaterial } from "@/types/Dashboard.d";

interface Props {
  data: ITopMaterial[];
}

const TopMaterialTable = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader className="font-semibold text-lg">
        Material Paling Direkomendasikan (Top 5)
      </CardHeader>

      <CardBody>
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada hasil rekomendasi material.
          </p>
        ) : (
          <Table aria-label="Top Material Table">
            <TableHeader>
              <TableColumn>Rank</TableColumn>
              <TableColumn>Nama Material</TableColumn>
              <TableColumn>Total Rekomendasi</TableColumn>
            </TableHeader>

            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-primary">
                      {item.total}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default TopMaterialTable;
