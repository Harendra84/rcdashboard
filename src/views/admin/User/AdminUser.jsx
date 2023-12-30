import { useEffect, useState } from 'react'
import DataTable from './DataTable';
import { columns } from './Columns';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { addUser, userLists } from '@/services/UserService';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { rcCenterLists } from '@/services/RcCenterService';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminUser = (props) => {

    const [users, setUsers] = useState([]);
    const [rcCenters, setRcCenters] = useState([]);
    const [rcCenterId, setRcCenterId] = useState();
    const [roleType, setRoleType] = useState("UNDEFINED");
    const [campus, setCampus] = useState("");
    const [active, setActive] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rcCenterName, setRcCenterName] = useState("");

    const [user, setUser] = useState({
        "fullName": "",
        "username": "",
        "campus": "",
        "designation": "",
        "department": "",
        "emailId": "",
        "mobileNo": "",
        "roleType": "",
        "rcCenter": {
            "rcCenterId": 0
        }
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {

        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        userLists().then((response) => {
            console.log(response.data.listOfData);
            setLoading(true);
            setUsers(response.data.listOfData);
            toast.success("Fetch users successfully!!👍");
            setLoading(false);
        }).catch(error => {
            console.log(error)
        })

    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        user.rcCenter.rcCenterId = rcCenterId;
        user.roleType = roleType;
        user.campus = campus;
        let isStatus = active === "true" ? true : false;
        const updatedUser = { ...user, 'active': isStatus }
        const response = addUser(updatedUser).catch(console.log);
        if (response?.data?.status) {
            setIsDialogOpen(false)
            setUsers([...users, response.data.data])
            toast.success("Added user successfully!!👍");
        }
    };

    useEffect(() => {
        const selectedCenter = rcCenters.find(center => center.rcCenterId === rcCenterId);
        if (selectedCenter) {
            setRcCenterName(selectedCenter.rcCenterName);
        }
    }, [rcCenters, rcCenterId]);

    // check user active or inactive
    const modifiedData = users.map((values) => {
        return {
            ...values, active: values.active === true ? "Active" : "Inactive"
        }
    });

    // filter user admin, or ceo, coordinator
    const filterData = modifiedData.filter((value) => {
        return value.roleType !== "ADMIN" && value.roleType !== "MANAGER"
    });

    return (
        <>
            <Toaster />
            <div className='main-container'>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="items-start justify-between md:flex mt-12">
                        <div className="max-w-lg">
                            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                User Table
                            </h3>
                        </div>
                        <div className="mt-3 md:mt-0 flex gap-4">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-500 active:bg-gray-800 md:text-sm rounded-full">Add User</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-3xl" style={{ backgroundColor: '#1d2634', color: '#ffffff' }}>
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <DialogHeader>
                                            <DialogTitle className="text-white">Add User</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="fullName" className="text-right text-slate-300 font-bold">Full Name</Label>
                                                <Input onChange={(e) => handleChange(e)} name="fullName" type="text" id="fullname" placeholder="Enter Full Name" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                <Label htmlFor="username" className="text-right text-slate-300 font-bold">Username</Label>
                                                <Input onChange={(e) => handleChange(e)} type="text" name="username" id="username" placeholder="Enter Username" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                            </div>

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="campus" className="text-right text-slate-300 font-bold">Campus</Label>
                                                <Select onValueChange={(value) => setCampus(value)} type="text" name="campus" id="campus" required className="col-span-3 border-slate-300">
                                                    <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                                        <SelectValue placeholder="Select Campus" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 text-white" >
                                                        <SelectGroup>
                                                            <SelectLabel>Campus</SelectLabel>
                                                            <SelectItem value="PKD">PKD</SelectItem>
                                                            <SelectItem value="BBSR">BBSR</SelectItem>
                                                            <SelectItem value="VIZAG">VIZAG</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <Label htmlFor="designation" className="text-right text-slate-300 font-bold">Designation</Label>
                                                <Input onChange={(e) => handleChange(e)} type="text" name="designation" id="designation" placeholder="Enter Designation" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                            </div>

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="department" className="text-right text-slate-300 font-bold">Department</Label>
                                                <Input onChange={(e) => handleChange(e)} type="text" name="department" id="department" placeholder="Enter Department" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                <Label htmlFor="emailId" className="text-right text-slate-300 font-bold">Email Id</Label>
                                                <Input onChange={(e) => handleChange(e)} type="email" name="emailId" id="emailId" placeholder="Enter Email Id" required className="col-span-3 border-slate-300 focus:outline-none outline-none bg-gray-800 text-white" />
                                            </div>

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="mobileNo" className="text-right text-slate-300 font-bold">Phone No</Label>
                                                <Input onChange={(e) => handleChange(e)} type="number" name="mobileNo" id="mobileNo" placeholder="Enter Mobile No." required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />

                                                <Label htmlFor="roleType" className="text-right text-slate-300 font-bold">Role Type</Label>
                                                <Select onValueChange={(value) => setRoleType(value)} type="text" name="roleType" id="roleType" required className="col-span-3 border-slate-300">
                                                    <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                                        <SelectValue placeholder="Select Role Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 text-white" >
                                                        <SelectGroup>
                                                            <SelectLabel>Role Type</SelectLabel>
                                                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                                                            <SelectItem value="CEO">CEO</SelectItem>
                                                            <SelectItem value="COORDINATOR">COORDINATOR</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="status" className="text-right text-slate-300 font-bold">Status</Label>
                                                <Select onValueChange={(value) => setActive(value)} type="text" name="active" id="active" required className="col-span-3 border-slate-300 ">
                                                    <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800">
                                                        <SelectValue placeholder="Select Status" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 text-white">
                                                        <SelectGroup>
                                                            <SelectLabel>Status</SelectLabel>
                                                            <SelectItem value="true">ACTIVE</SelectItem>
                                                            <SelectItem value="false">INACTIVE</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>

                                                <Label htmlFor="rcCenterName" className="text-right text-slate-300 font-bold">Rc Center</Label>
                                                <Select value={rcCenterName} onValueChange={(value) => {
                                                    setRcCenterId(value);
                                                    const selectedCenter = rcCenters.find(center => center.rcCenterId === value);
                                                    if (selectedCenter) {
                                                        setRcCenterName(selectedCenter.rcCenterName);
                                                    }
                                                }} type="text" name="rcCenterName" id="rcCenterName" placeholder="Enter RC Center" required className="col-span-3 border-slate-300 ">
                                                    <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                                        <SelectValue>{rcCenterName || "Select Rc Center"}</SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent position="popper" className="bg-gray-800 text-white">
                                                        {
                                                            rcCenters.length > 0 ? rcCenters.map((center) => (
                                                                <div className="" key={center.rcCenterId}>
                                                                    <SelectItem value={center.rcCenterId}>{center.rcCenterName}</SelectItem>
                                                                </div>
                                                            )) : null
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" className="bg-gray-800 text-white border border-gray-500">Save</Button>
                                            <DialogClose asChild>
                                                <Button type="button" className="bg-gray-800 text-white border border-gray-500">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="mt-12 shadow-sm rounded-lg overflow-x-auto">
                        {
                            loading ? (
                                <AiOutlineLoading3Quarters className="flex items-center justify-center w-full animate-spin text-lg" />
                            ) : (
                                <DataTable columns={columns} data={filterData} />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUser;