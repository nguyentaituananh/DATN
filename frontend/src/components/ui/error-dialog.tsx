import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface ErrorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    unavailableProducts?: string[];
}

export const ErrorDialog = ({
    open,
    onOpenChange,
    title,
    description,
    unavailableProducts
}: ErrorDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                            {title}
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-gray-600 mt-4">
                        {description}
                    </AlertDialogDescription>

                    {unavailableProducts && unavailableProducts.length > 0 && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm font-medium text-red-800 mb-2">
                                Sản phẩm không khả dụng:
                            </p>
                            <ul className="space-y-1">
                                {unavailableProducts.map((product, index) => (
                                    <li key={index} className="text-sm text-red-700 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                        {product}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={() => onOpenChange(false)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Đã hiểu
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ErrorDialog;
