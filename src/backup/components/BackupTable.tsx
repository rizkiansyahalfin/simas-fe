import { useMemo, useState } from "react";

import {
  Download,
  FileArchive,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";


import { useDownloadBackup } from "../hooks/useDownloadBackup";
import {
  formatBytes,
  formatDate,
} from "../utils/backup.utils";
import type { BackupFile } from "../backup.types";

interface BackupTableProps {
  data: BackupFile[];
  isLoading: boolean;
}

export const BackupTable = ({
  data,
  isLoading,
}: BackupTableProps) => {
  const [search, setSearch] = useState("");

  const downloadMutation =
    useDownloadBackup();

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) =>
      item.filename
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, search]);

  const handleDownload = (
    backup: BackupFile,
  ) => {
    downloadMutation.mutate(backup.id);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <FileArchive className="h-10 w-10 animate-pulse text-muted-foreground" />

            <p className="text-sm text-muted-foreground">
              Memuat daftar backup...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Cari nama backup..."
            className="pl-9"
          />
        </div>

        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <FileArchive className="h-12 w-12 text-muted-foreground" />

            <div className="text-center">
              <h3 className="font-semibold">
                Tidak ada data
              </h3>

              <p className="text-sm text-muted-foreground">
                Backup tidak ditemukan.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Filename
                  </TableHead>

                  <TableHead>
                    Size
                  </TableHead>

                  <TableHead>
                    Date
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.map(
                  (backup) => (
                    <TableRow
                      key={backup.id}
                    >
                      <TableCell className="font-medium">
                        {backup.filename}
                      </TableCell>

                      <TableCell>
                        {formatBytes(
                          backup.size,
                        )}
                      </TableCell>

                      <TableCell>
                        {formatDate(
                          backup.createdAt,
                        )}
                      </TableCell>

                      <TableCell>
                        {backup.latest ? (
                          <Badge>
                            Latest
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            Archive
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            handleDownload(
                              backup,
                            )
                          }
                          disabled={
                            downloadMutation.isPending
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};