import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getByPublicationsTypeId, updatePublicationsType } from '@/services/PublicationsType';
import toast, { Toaster } from 'react-hot-toast';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const UpdateViewAdminPublicationsType = () => {

    const [title, setTitle] = useState("Update Parameter");
    const [isDisabled, setIsDisabled] = useState(false);

    const query = useQuery();
    const params = useParams();
    const navigate = useNavigate();

    const [publicationsType, setPublicationsType] = useState({
        "publicationsTypeId": 0,
        "publicationsName": "",
        "benchmarksNo": 0,
    });

    const handleChange = (e) => {
        setPublicationsType({ ...publicationsType, [e.target.name]: e.target.value });
    };

    useEffect(() => {

        if (!query.get('updatecall')) {
            setIsDisabled(true)
            setTitle("View Parameter")
        }

        getByPublicationsTypeId(params.publicationsTypeId).then((response) => {
            if (!response.data.data) {
                return navigate("/admin-dashboard/publicationstype");
            }
            setPublicationsType(response.data.data);
        }).catch(error => {
            console.log(error)
        })

    }, [query, params.publicationsTypeId])

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await updatePublicationsType(publicationsType).catch(console.log)
        if (response?.data?.status) {
            toast.success("Update parameters successfully!!👍");
            navigate("/admin-dashboard/publicationstype");
        }
    };

    return (
        <>
        <Toaster/>
            <div className="main-container">
                <Card className="w-[600px] mx-auto my-20 bg-[#1d2634] text-white">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="publicationsName" className="text-right text-slate-300 font-bold">Parameter Name</Label>
                                    <Input value={publicationsType.publicationsName} onChange={(e) => handleChange(e)} disabled={isDisabled} type="text" id="publicationsName" name="publicationsName" placeholder="Enter Parameter Name" required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                    <Label htmlFor="benchmarksNo" className="text-right text-slate-300 font-bold">Benchmark No</Label>
                                    <Input value={publicationsType.benchmarksNo} onChange={(e) => handleChange(e)} disabled={isDisabled} type="any" name="benchmarksNo" id="benchmarksNo" placeholder="Enter Benchmark No." required className="col-span-3 border-slate-300 focus:outline-none bg-gray-800 text-white" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            {!query.get('updatecall') ? (
                                <Link to="/admin-dashboard/publicationstype">
                                    <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/admin-dashboard/publicationstype">
                                        <Button variant="outline" className="bg-gray-600 text-white border border-gray-500">Go Back</Button>
                                    </Link>
                                    <Link to="/admin-dashboard/publicationstype">
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

export default UpdateViewAdminPublicationsType