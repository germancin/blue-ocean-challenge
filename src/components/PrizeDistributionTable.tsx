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

  const rows = t('prizes.distribution.rows', { returnObjects: true }) || [];

  return (
    <div className="bg-navy py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-display mb-4">
            {t('prizes.distribution.title')}
          </h2>
          <p className="text-white text-xl mb-8">
            {t('prizes.distribution.totalBudget')}
          </p>
          <div className="w-24 h-1 bg-bright-blue mx-auto rounded-full mb-12" />
        </div>

        <div className="bg-black/50 rounded-xl p-6 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.position')}
                </TableHead>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.winners')}
                </TableHead>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.prize')}
                </TableHead>
                <TableHead className="text-white">
                  {t('prizes.distribution.table.total')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(rows) && rows.map((row, index) => (
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