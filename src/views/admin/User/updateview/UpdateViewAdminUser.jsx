import { useEffect, useMemo, useState } from 'react'
import { addUser, getUserById, updateUser, userLists } from '@/services/UserService';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { rcCenterLists } from '@/services/RcCenterService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const UpdateViewAdminUser = () => {

    const [rcCenters, setRcCenters] = useState([]);
    const [rcCenterId, setRcCenterId] = useState();
    const [roleType, setRoleType] = useState("UNDEFINED");
    const [status, setStatus] = useState(true);
    const [title, setTitle] = useState("Update User");
    const [isDisabled, setIsDisabled] = useState(false);

    const query = useQuery();
    const params = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        "fullName": "",
        "username": "",
        "campus": "",
        "designation": "",
        "department": "",
        "emailId": "",
        "mobileNo": "",
        "rcCenter": {
            "rcCenterId": 0
        }
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {

        if (!query.get('updatecall')) {
            setIsDisabled(true)
            setTitle("View Details of User")
        }

        //rc center list 
        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
        }).catch(error => {
            console.log(error)
        })

        //get user by id 
        getUserById(params.userId).then((response) => {
            if (!response.data.data) {
                return navigate("/admin-dashboard/user");
            }
            setUser(response.data.data);
            setStatus(String(response.data.data.active))
            setRoleType(response.data.data.roleType);
            setRcCenterId(response.data.data.rcCenter.rcCenterId);
        }).catch(error => {
            console.log(error)
        })

    }, [query, params.userId])

    const onSubmit = async (e) => {
        user.rcCenter.rcCenterId = rcCenterId;
        e.preventDefault();
        const response = await updateUser(user).catch(console.log)
        if (response?.data?.status) {
            navigate("/admin-dashboard/user");
        }
    };

    return (
        <>
            <div className="main-container">
                <Card className="w-[1100px] mx-auto my-20 bg-[#1d2634] text-white">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="fullname" className="text-right text-slate-300 font-bold">Full Name</Label>
                                    <Input value={user.fullName} onChange={(e) => handleChange(e)} disabled={isDisabled} name="fullName" id="fullname" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                    <Label htmlFor="username" className="text-right text-slate-300 font-bold">Username</Label>
                                    <Input value={user.username} onChange={(e) => handleChange(e)} disabled={isDisabled} name="username" id="username" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                </div>

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="campus" className="text-right text-slate-300 font-bold">Campus</Label>
                                    <Input value={user.campus} onChange={(e) => handleChange(e)} disabled={isDisabled} name="campus" id="campus" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                    <Label htmlFor="designation" className="text-right text-slate-300 font-bold">Designation</Label>
                                    <Input value={user.designation} onChange={(e) => handleChange(e)} disabled={isDisabled} name="designation" id="designation" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                </div>

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="department" className="text-right text-slate-300 font-bold">Department</Label>
                                    <Input value={user.department} onChange={(e) => handleChange(e)} disabled={isDisabled} name="department" id="department" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                    <Label htmlFor="emailId" className="text-right text-slate-300 font-bold">Email Id</Label>
                                    <Input value={user.emailId} onChange={(e) => handleChange(e)} disabled={isDisabled} name="emailId" id="emailId" className="col-span-3 border-slate-300 focus:outline-none outline-none bg-gray-800 text-white" />
                                </div>

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="mobileNo" className="text-right text-slate-300 font-bold">Phone</Label>
                                    <Input value={user.mobileNo} onChange={(e) => handleChange(e)} disabled={isDisabled} name="mobileNo" id="mobileNo" className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />

                                    <Label htmlFor="roleType" className="text-right text-slate-300 font-bold">Role Type</Label>
                                    <Select value={roleType} onValueChange={(value) => setRoleType(value)} disabled={isDisabled} name="roleType" id="roleType" className="col-span-3 border-slate-300">
                                        <SelectTrigger className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 text-white" >
                                            <SelectGroup>
                                                <SelectLabel>Role</SelectLabel>
                                                <SelectItem value="ADMIN">ADMIN</SelectItem>
                                                <SelectItem value="CEO">CEO</SelectItem>
                                                <SelectItem value="COORDINATOR">COORDINATOR</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="status" className="text-right text-slate-300 font-bold">Status</Label>
                                    <Select value={status} onValueChange={(value) => setStatus(value)} disabled={isDisabled} name="active" id="active" className="col-span-3 border-slate-300 ">
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
                                    <Select value={rcCenterId} onValueChange={(value) => setRcCenterId(value)} disabled={isDisabled} name="rcCenterName" id="rcCenterName" className="col-span-3 border-slate-300 ">
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
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            {!query.get('updatecall') ? (
                                <Link to="/admin-dashboard/user">
                                    <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/admin-dashboard/user">
                                        <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                    </Link>
                                    <Link to="/admin-dashboard/user">
                                        <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Cancel</Button>
                                    </Link>
                                </>
                            )}
                            <Button type="submit" disabled={isDisabled} className="bg-gray-800 text-white border border-gray-500">Save</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default UpdateViewAdminUser;