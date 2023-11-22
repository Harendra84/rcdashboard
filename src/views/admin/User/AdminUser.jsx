import { useEffect, useState } from 'react'
import { columns } from './Columns';
import { addUser, updateUser, userLists } from '@/services/UserService';
import DataTable from './DataTable';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { rcCenterLists } from '@/services/RcCenterService';

const AdminUser = (props) => {

    const [users, setUsers] = useState([]);
    const [rcCenters, setRcCenters] = useState([]);
    const [rcCenterId, setRcCenterId] = useState();
    const [roleType, setRoleType] = useState("UNDEFINED");
    const [active, setActive] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // add and update user
    const onSubmit = async (e) => {
        e.preventDefault();
        user.rcCenter.rcCenterId = parseInt(rcCenterId);
        user.roleType = roleType;

        let isStatus = active === "true" ? true : false;
        const updatedUser = { ...user, 'active': isStatus }

        const response = addUser(updatedUser).catch(console.log);

        if (response?.data?.status) {
            setIsDialogOpen(false)
            setUsers([...users, response.data.data])
        }
    };

    useEffect(() => {

        //rc center list 
        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        //user list 
        userLists().then((response) => {
            console.log("User data for listing : ", response.data.listOfData)
            setUsers(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

    }, [])

    // check user active or inactive
    const modifiedData = users.map((values) => {
        return {
            ...values, active: values.active === true ? "Active" : "Inactive"
        }
    });

    // filter user admin, or ceo, coordinator
    const filterData = modifiedData.filter((value) => {
        return value.roleType !== "ADMIN"
    });

    return (
        <>
            <div className='main-container'>
                <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="items-start justify-between md:flex mt-12">
                        <div className="max-w-lg">
                            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                User Table
                            </h3>
                        </div>
                        {/* Add user */}
                        <div className="mt-3 md:mt-0 flex gap-4">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 rounded-lg hover:bg-gray-500 active:bg-gray-800 md:text-sm">Add User</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-2xl" style={{ backgroundColor: '#1d2634', color: '#ffffff' }}>
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <DialogHeader>
                                            <DialogTitle className="text-white">New User </DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="fullName" className="text-right text-slate-300 font-bold">Full Name</Label>
                                                <Input onChange={(e) => handleChange(e)} name="fullName" type="text" id="fullname" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                <Label htmlFor="username" className="text-right text-slate-300 font-bold">Username</Label>
                                                <Input onChange={(e) => handleChange(e)}  type="text" name="username" id="username" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                            </div>

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="campus" className="text-right text-slate-300 font-bold">Campus</Label>
                                                <Input onChange={(e) => handleChange(e)} name="campus" id="campus" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                <Label htmlFor="designation" className="text-right text-slate-300 font-bold">Designation</Label>
                                                <Input onChange={(e) => handleChange(e)} type="text" name="designation" id="designation" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                            </div>

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="department" className="text-right text-slate-300 font-bold">Department</Label>
                                                <Input onChange={(e) => handleChange(e)} type="text" name="department" id="department" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                                <Label htmlFor="emailId" className="text-right text-slate-300 font-bold">Email Id</Label>
                                                <Input onChange={(e) => handleChange(e)} type="text" name="emailId" id="emailId" className="col-span-3 border-slate-300 focus:outline-none outline-none bg-gray-800 text-white" />
                                            </div>

                                            <div className="grid grid-cols-8 items-center gap-4">
                                                <Label htmlFor="mobileNo" className="text-right text-slate-300 font-bold">Phone No</Label>
                                                <Input onChange={(e) => handleChange(e)} type="number" name="mobileNo" id="mobileNo" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />

                                                <Label htmlFor="roleType" className="text-right text-slate-300 font-bold">Role Type</Label>
                                                <Select onValueChange={(value) => setRoleType(value)} type="text" name="roleType" id="roleType" className="col-span-3 border-slate-300">
                                                    <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                                        <SelectValue placeholder="Select a role" />
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
                                                <Select onValueChange={(value) => setActive(value)} type="text" name="active" id="active" className="col-span-3 border-slate-300 ">
                                                    <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800">
                                                        <SelectValue placeholder="Select a status" />
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
                                                <Select onValueChange={(value) => setRcCenterId(value)} type="text" name="rcCenterName" id="rcCenterName" className="col-span-3 border-slate-300 ">
                                                    <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                                        <SelectValue placeholder="Select Rc Center" />
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
                        <DataTable columns={columns} data={filterData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUser;