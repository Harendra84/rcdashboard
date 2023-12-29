import { useEffect, useMemo, useState } from 'react'
import { getUserById, updateUser } from '@/services/UserService';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { rcCenterLists } from '@/services/RcCenterService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const UpdateViewAdminUser = () => {

    const [rcCenters, setRcCenters] = useState([]);
    const [rcCenterId, setRcCenterId] = useState("");
    const [roleType, setRoleType] = useState("UNDEFINED");
    const [campus, setCampus] = useState("");
    const [status, setStatus] = useState();
    const [title, setTitle] = useState("Update User");
    const [isDisabled, setIsDisabled] = useState(false);
    const [rcCenterName, setRcCenterName] = useState("");


    const query = useQuery();
    const params = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        "active": "",
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
            setTitle("View User")
        }

        rcCenterLists().then((response) => {
            setRcCenters(response.data.listOfData);
        }).catch(console.log)

        getUserById(params.userId).then((response) => {
            if (!response.data.data) {
                return navigate("/admin-dashboard/user");
            }
            setUser(response.data.data);
            setStatus(String(response.data.data.active))
            setRoleType(response.data.data.roleType);
            setCampus(response.data.data.campus);
            setRcCenterId(response.data.data.rcCenter.rcCenterId);
        }).catch(console.log)
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        user.rcCenter.rcCenterId = rcCenterId;
        user.campus = campus;
        user.roleType = roleType;
        user.active = status;
        const response = await updateUser(user).catch(console.log)
        if (response?.data?.status) {
            toast.success("Update user successfully!!👍");
            navigate("/admin-dashboard/user");
        }
    };


    useEffect(() => {
        const selectedCenter = rcCenters.find(center => center.rcCenterId === rcCenterId);
        if (selectedCenter) {
            setRcCenterName(selectedCenter.rcCenterName);
        }
    }, [rcCenters, rcCenterId]);
    return (
        <>
            <div className="main-container">
                <Card className="w-[800px] mx-auto my-20 bg-[#1d2634] text-white">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="fullname" className="text-right text-slate-300 font-bold">Full Name</Label>
                                    <Input value={user.fullName} onChange={(e) => handleChange(e)} disabled={isDisabled} type="text" name="fullName" id="fullname" placeholder="Enter Full Name" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                    <Label htmlFor="username" className="text-right text-slate-300 font-bold">Username</Label>
                                    <Input value={user.username} onChange={(e) => handleChange(e)} disabled={isDisabled} type="text" name="username" id="username" placeholder="Enter Username" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                </div>

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="campus" className="text-right text-slate-300 font-bold">Campus</Label>
                                    <Select value={campus} onValueChange={(value) => setCampus(value)} disabled={isDisabled} type="text" name="campus" id="campus" placeholder="Enter Campus" required className="col-span-3 border-slate-300">
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
                                    <Input value={user.designation} onChange={(e) => handleChange(e)} disabled={isDisabled} type="text" name="designation" id="designation" placeholder="Enter Designation" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                </div>

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="department" className="text-right text-slate-300 font-bold">Department</Label>
                                    <Input value={user.department} onChange={(e) => handleChange(e)} disabled={isDisabled} type="text" name="department" id="department" placeholder="Enter Department" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                    <Label htmlFor="emailId" className="text-right text-slate-300 font-bold">Email Id</Label>
                                    <Input value={user.emailId} onChange={(e) => handleChange(e)} disabled={isDisabled} type="email" name="emailId" id="emailId" placeholder="Enter Email Id" required className="col-span-3 border-slate-300 focus:outline-none outline-none bg-gray-800 text-white" />
                                </div>

                                <div className="grid grid-cols-8 items-center gap-4">
                                    <Label htmlFor="mobileNo" className="text-right text-slate-300 font-bold">Mobile No</Label>
                                    <Input value={user.mobileNo} onChange={(e) => handleChange(e)} disabled={isDisabled} type="number" name="mobileNo" id="mobileNo" placeholder="Enter Mobile No" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />

                                    <Label htmlFor="roleType" className="text-right text-slate-300 font-bold">Role Type</Label>
                                    <Select value={roleType} onValueChange={(value) => setRoleType(value)} disabled={isDisabled} type="text" name="roleType" id="roleType" required className="col-span-3 border-slate-300">
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
                                    <Label htmlFor="active" className="text-right text-slate-300 font-bold">Status</Label>
                                    <Select value={status} onValueChange={(value) => setStatus(value)} disabled={isDisabled} type="text" name="active" id="active" required className="col-span-3 border-slate-300 ">
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
                                    <Select value={rcCenterName} onValueChange={(value) => {
                                        setRcCenterId(value);
                                        const selectedCenter = rcCenters.find(center => center.rcCenterId === value);
                                        if (selectedCenter) {
                                            setRcCenterName(selectedCenter.rcCenterName);
                                        }
                                    }} disabled={isDisabled} type="text" name="rcCenterName" id="rcCenterName" placeholder="Enter RC Center" required className="col-span-3 border-slate-300 ">
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