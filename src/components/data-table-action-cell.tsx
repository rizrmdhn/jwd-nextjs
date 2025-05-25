import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Ellipsis, Eye, LoaderCircle, Pencil, Printer } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type DataTableActionCellProps = {
  icon: React.ReactNode;
  editIcon?: React.ReactNode;
  editText?: string;
  triggerText: string;
  dialogTitle: string;
  dialogDescription: string;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  btnClassName?: string;
  onEditAction: string | (() => void);
  onConfirm: () => void;
  showDetail?: boolean;
  detailIcon?: React.ReactNode;
  detailText?: string;
  onDetailAction?: string | (() => void);
  showPrint?: boolean;
  printIcon?: React.ReactNode;
  printText?: string;
  onPrintAction?: () => void;
  deleteIcon?: React.ReactNode;
  deleteText?: string;
};

export default function DataTableActionCell({
  icon,
  editIcon = <Pencil className="mr-4 size-4" />,
  editText = "Edit",
  triggerText,
  dialogTitle,
  dialogDescription,
  cancelText,
  confirmText,
  isLoading = false,
  btnClassName,
  onEditAction,
  onConfirm,
  showDetail = false,
  detailIcon = <Eye className="mr-4 size-4" />,
  detailText = "Lihat Detail",
  onDetailAction,
  showPrint = false,
  printIcon = <Printer className="mr-4 size-4" />,
  printText = "Cetak PDF",
  onPrintAction,
  deleteIcon = icon,
  deleteText = triggerText,
}: DataTableActionCellProps) {
  const [isOpen, setIsOpen] = useState(false);

  // wait for the isLoading to be false before closing the dialog
  useEffect(() => {
    if (!isLoading) {
      setIsOpen(false);
    }
  }, [isLoading]);

  return (
    <AlertDialog open={isOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4 text-black dark:text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="group">
          {/* Detail Action */}
          {showDetail &&
            onDetailAction &&
            (typeof onDetailAction === "string" ? (
              <DropdownMenuItem asChild>
                <Link href={onDetailAction} className="flex flex-row">
                  {detailIcon}
                  {detailText}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onDetailAction()}>
                <div className="flex flex-row items-center">
                  {detailIcon}
                  {detailText}
                </div>
              </DropdownMenuItem>
            ))}

          {/* Edit Action */}
          {typeof onEditAction === "string" ? (
            <DropdownMenuItem asChild>
              <Link href={onEditAction} className="flex flex-row">
                {editIcon}
                {editText}
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => onEditAction()}>
              <div className="flex flex-row items-center">
                {editIcon}
                {editText}
              </div>
            </DropdownMenuItem>
          )}

          {/* Print Action */}
          {showPrint && onPrintAction && (
            <DropdownMenuItem onClick={onPrintAction}>
              <div className="flex flex-row items-center">
                {printIcon}
                {printText}
              </div>
            </DropdownMenuItem>
          )}

          {/* Delete Action */}
          <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
            <AlertDialogTrigger asChild onClick={() => setIsOpen(true)}>
              <div className="flex flex-row items-center">
                {deleteIcon}
                {deleteText}
              </div>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            {cancelText ?? "Batal"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm()}
            className={cn(btnClassName)}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {confirmText ?? "Konfirmasi"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
