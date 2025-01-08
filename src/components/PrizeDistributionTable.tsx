import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PrizeDistributionTable = () => {
  const { t } = useTranslation();

  const distributionData = [
    {
      position: "1st - 3rd Place",
      winners: "3",
      prize: "$2,000 - $500",
      total: "$3,500"
    },
    {
      position: "4th - 10th Place",
      winners: "7",
      prize: "$250",
      total: "$1,750"
    },
    {
      position: "11th - 20th Place",
      winners: "10",
      prize: "$100",
      total: "$1,000"
    }
  ];

  return (
    <div className="bg-navy py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-display mb-4">
            {t('prizes.distribution.title', 'Prize Distribution')}
          </h2>
          <p className="text-white text-xl mb-8">
            {t('prizes.distribution.totalBudget', 'Total Prize Pool: $6,250')}
          </p>
          <div className="w-24 h-1 bg-bright-blue mx-auto rounded-full mb-12" />
        </div>

        <div className="bg-black/50 rounded-xl p-6 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.position', 'Position')}
                </TableHead>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.winners', 'Winners')}
                </TableHead>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.prize', 'Prize')}
                </TableHead>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.total', 'Total')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributionData.map((row, index) => (
                <TableRow key={index} className="border-b border-gray-700">
                  <TableCell className="text-white">{row.position}</TableCell>
                  <TableCell className="text-white">{row.winners}</TableCell>
                  <TableCell className="text-white">{row.prize}</TableCell>
                  <TableCell className="text-white">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PrizeDistributionTable;