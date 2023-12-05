import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { deletePublications } from "@/services/PublicationsService";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const showPublicationColor = ({ row }) => {

    const totalMember = row.original.rcCenter.totalMembers;
    const benchMarks = row.original.publicationsType.benchmarksNo;
    const avg = Math.ceil(totalMember * benchMarks);

    let colorClass = "text-red-600 font-semibold bg-[#ffcdd2] px-8 py-2 rounded-xl";
    if (avg === row.original.publicationsNo) {
        colorClass = "text-yellow-600 font-semibold bg-[#fff9c4] px-8 py-2 rounded-xl";
    } else if (row.original.publicationsNo > avg) {
        colorClass = "text-green-600 font-semibold bg-[#c8e6c9] px-8 py-2 rounded-xl";
    }
    return <span className={colorClass}>{row.original.publicationsNo}</span>;
}

export const CellComponent = ({ row }) => {
    let navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        deletePublications(row.original.publicationsId).then((response) => {
            if (response.data) {
                setIsDialogOpen(false);
                toast.error("Deleted performance successfully!!👍");
                navigate('/ceo-dashboard/publications');
            }
        }).catch(error => {
            console.log(error)
        })
    };

    return (
        <>
            <Toaster />
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 bg-gray-800 text-white border  border-slate-600 hover:bg-gray-400 rounded-full">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 rounded-xl">
                        <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                        <Link to={`/ceo-dashboard/publications/manage/${row.original.publicationsId}`}>
                            <DropdownMenuItem>
                                <Button variant="ghost" className="h-8 w-full bg-blue-500 text-white hover:bg-white-600 border border-gray-500 rounded-full">
                                    View
                                </Button>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link to={`/ceo-dashboard/publications/manage/${row.original.publicationsId}/?updatecall=true`} state={{ 'updatecall': true }}>
                            <DropdownMenuItem>
                                <Button variant="ghost" className="h-8 w-full bg-green-800 text-white border hover:bg-white-600 border-gray-500 rounded-full">
                                    Edit
                                </Button>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="h-8 w-full bg-red-800 text-white border hover:bg-white-600 border-gray-500 rounded-full" onClick={() => setIsDialogOpen(true)}>
                                    Remove
                                </Button>
                            </DialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    {isDialogOpen && (
                        <DialogContent className="sm:max-w-[425px] bg-slate-400">
                            <DialogHeader>
                                <DialogTitle className="text-red-600 text-xl font-bold">Confirm!</DialogTitle>
                                <DropdownMenuSeparator />
                                <DialogTitle className="text-gray-800 text-xl font-bold">Are you sure?</DialogTitle>
                                <DialogDescription className="text-gray-800">
                                    This action will delete this rc center permanentely.
                                </DialogDescription>
                            </DialogHeader>
                            <DropdownMenuSeparator className="text-gray-800" />
                            <DialogFooter>
                                <Button type="button" className="text-gray-800 hover:bg-red-600" onClick={handleDelete}>Yes</Button>
                                <Button type="button" className="text-gray-800 hover:bg-green-600" onClick={() => setIsDialogOpen(false)}>No</Button>
                            </DialogFooter>
                        </DialogContent>
                    )}
                </DropdownMenu>
            </Dialog>
        </>
    )
}

const columnHelper = createColumnHelper();
export const columns = [

    columnHelper.accessor("", {
        accessorKey: "S.No",
        header: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>
    }),
    {
        header: "Rc Center",
        accessorFn: row => row.rcCenter.rcCenterName
    },
    {
        header: "Parameter Name",
        accessorFn: row => row.publicationsType.publicationsName
    },
    {
        header: "Performance Value",
        id: "performance value",
        enableHiding: false,
        cell: showPublicationColor,
    },
    {
        header: "Actions",
        id: "actions",
        enableHiding: false,
        cell: CellComponent
    },
]