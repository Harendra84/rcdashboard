import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/services/UserService";
import { Dialog } from "@radix-ui/react-dialog";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export const CellComponent = ({ row }) => {
    let navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        deleteUser(row.original.userId).then((response) => {
            if (response.data.status) {
                setIsDialogOpen(false)
                navigate('/admin-dashboard/user');
            }
        }).catch(error => {
            console.log(error)
        })
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 bg-gray-800 text-white border border-gray-500">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800">
                    <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                    <Link to={`/admin-dashboard/user/manage/${row.original.userId}`}>
                        <DropdownMenuItem>
                            <Button variant="ghost" className="h-8 w-full bg-blue-500 text-white hover:bg-white-600 border border-gray-500">
                                View
                            </Button>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link to={`/admin-dashboard/user/manage/${row.original.userId}/?updatecall=true`} state={{ 'updatecall': true }}>
                        <DropdownMenuItem>
                            <Button variant="ghost" className="h-8 w-full bg-green-800 text-white border hover:bg-white-600 border-gray-500">
                                Edit
                            </Button>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-8 w-full bg-red-800 text-white border hover:bg-white-600 border-gray-500" onClick={() => setIsDialogOpen(true)}>
                                Remove
                            </Button>
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                {isDialogOpen && (
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-red-600 text-xl font-bold">Confirm!</DialogTitle>
                            <DropdownMenuSeparator />
                            <DialogTitle className="text-gray-800 text-xl font-bold">Are you sure?</DialogTitle>
                            <DialogDescription className="text-gray-800">
                                This action will delete this trainer permanentely.
                            </DialogDescription>
                        </DialogHeader>
                        <DropdownMenuSeparator className="text-gray-800" />
                        <DialogFooter>
                            <Button type="button" className="text-gray-800 hover:bg-red-600"  onClick={handleDelete}>Yes</Button>
                            <Button type="button" className="text-gray-800 hover:bg-green-600" onClick={() => setIsDialogOpen(false)}>No</Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </DropdownMenu>
        </Dialog>
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
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "campus",
        header: "Campus",
    },
    {
        accessorKey: "designation",
        header: "Designation",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "emailId",
        header: "Email Id",
    },
    {
        accessorKey: "mobileNo",
        header: "Mobile No",
    },
    {
        accessorKey: "roleType",
        header: "Role Type",
    },
    {
        accessorKey: "active",
        header: "Status",
    },
    {
        header: "RcCenter",
        accessorFn: row => row.rcCenter.rcCenterName,
    },
    {
        header: "Actons",
        id: "actions",
        enableHiding: false,
        cell: CellComponent,
    },
]