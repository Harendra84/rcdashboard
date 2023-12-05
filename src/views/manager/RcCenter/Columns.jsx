import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { deleteRcCenter } from "@/services/RcCenterService";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const CellComponent = ({ row }) => {
    let navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        deleteRcCenter(row.original.rcCenterId).then((response) => {
            if (response.data.status) {
                setIsDialogOpen(false)
                 toast.error("Deleted RC Center successfully!!👍");
                navigate('/admin-dashboard/rcCenter');
            }
        }).catch(error => {
            console.log(error)
        })
    };
    return (
        <>
         <Toaster/>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 bg-gray-800 text-white border border-gray-500">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800">
                        <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                        <Link to={`/manager-dashboard/rcCenter/`}>
                            <DropdownMenuItem>
                                <Button variant="ghost" className="h-8 w-full bg-blue-500 text-white hover:bg-white-600 border border-gray-500 rounded-full">
                                    View
                                </Button>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link to={`/manager-dashboard/rcCenter/`} state={{ 'updatecall': false }}>
                            <DropdownMenuItem>
                                <Button variant="ghost" className="h-8 w-full bg-green-800 text-white border hover:bg-white-600 border-gray-500 rounded-full">
                                    Edit
                                </Button>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="h-8 w-full bg-red-800 text-white border hover:bg-white-600 border-gray-500 rounded-full" onClick={() => setIsDialogOpen(false)}>
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
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.No",
    }),
    {
        accessorKey: "rcCenterName",
        header: "Rc Center Name",
    },
    {
        accessorKey: "totalMembers",
        header: "Total Members",
    },
    // {
    //     header: "Actions",
    //     id: "actons",
    //     enableHiding: false,
    //     cell: CellComponent,
    // },
]