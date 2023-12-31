import {
    Card,
    Title,
    Text,
    Flex,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Badge,
    Button,
    Color,
  } from "@tremor/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
import { SafePost, SafePostWithPlan } from "../types";
import useConfirmationModal from "../hooks/useConfirmationModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { redirect } from "next/navigation";
import {Switch} from "@nextui-org/react";
import { CoursePlan } from "@prisma/client";
  
const colors: { [key: string]: Color } = {
Verification: "gray",
Active: "emerald",
};

interface PostTableProps {
    posts: SafePostWithPlan[];
}

  
const PostTable: React.FC<PostTableProps> = ({
    posts
}) => {

    const [search, setSearch] = useState("");
    const [displayPosts, setDisplayPosts] = useState(posts);
    const [isLoading, setIsLoading] = useState(false);

    const [ coursePlanName, setCoursePlanName ] = useState([]);


    console.log("Display Posts: ", displayPosts);

    let publishedStatusArr = [];

    for (let i = 0; i < displayPosts.length; i++) {
        publishedStatusArr.push(displayPosts[i].published);
    }

    const [isChecked, setIsChecked] = useState(publishedStatusArr);


    const changeStatus = (postID: string, index: number) => {
        console.log("Change Status: ", index);

        const data = {
            postID: postID,
            published: isChecked[index]
        }
        console.log("Checked before: ", isChecked)
        isChecked[index] = !isChecked[index];
        
        setIsChecked(isChecked);
        console.log("Checked after: ", isChecked);
        
        axios.post("/api/changeVisibility", data).then((res) => {
            console.log(res.data);
            //setIsChecked(isChecked);  
        });
    }
    useEffect(() => {
        setIsChecked(isChecked);
        console.log("Checked: ", isChecked);
    }, [isChecked]);

    const confirmationModal = useConfirmationModal();

    async function getResults(search: string) {
        console.log("Search Results: ", search);

        const body = {
            search : search,
            admin : true
        }

        axios.post("/api/searchPosts", body ).then((res) => {
            console.log(res.data);
            setDisplayPosts(res.data);
            setIsLoading(false);
        });
    }

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(search);
        setIsLoading(true);
        getResults(search);
      };

    return (
        <Card className="mt-6">
            <div className="flex mt-2 mb-5 max-w-md gap-2 items-center">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="rounded-md shadow-sm flex">
                    <input
                    type="text"
                    name="search"
                    id="search"
                    className="h-10 block w-full rounded-md border border-gray-200 pl-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search by content/author..."
                    spellCheck={false}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button variant="secondary" color="gray" onClick={handleSearch}>Search</Button>
                <TailSpin
                            height="20"
                            width="20"
                            color="#000000"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={isLoading === true}
                            />
            </div>
            
            <Card>
                <Flex justifyContent="start" className="space-x-2">
                    <Title>Posts</Title>
                    <Badge color="gray">{displayPosts.length}</Badge>
                </Flex>
                {/* <Text className="mt-2">Overview of this month's purchases</Text> */}

                <Table className="mt-6">
                    <TableHead>
                    <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>Course Plan</TableHeaderCell>
                        <TableHeaderCell>Uploaded</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {displayPosts.map((item, index) => (

                        <TableRow key={item.id}>
                        <TableCell>
                            <span>
                            {
                                item.title ? ( item.title.length? item.title :item.title?.substring(0, 40)) : "-"
                            }
                            </span>
                        </TableCell>
                        <TableCell>
                            {
                                item.coursePlan.title ? (
                                    <Badge color="gray" size="xs">
                                        {item.coursePlan.title}
                                    </Badge>
                                ) : (
                                    <Badge color="gray" size="xs">
                                        -
                                    </Badge>
                                )
                            }
                        </TableCell>
                        <TableCell>
                            {
                                item.coursePlan.title ? (
                                    <Switch 
                                        initialChecked={isChecked[index]}
                                        size="md"
                                        color="secondary"
                                        onChange={() => changeStatus(item.postID, index)}

                                    />
                                ) : (
                                    <Switch 
                                        initialChecked={isChecked[index]}
                                        size="md"
                                        color="secondary"
                                        onChange={() => changeStatus(item.postID, index)}
                                        disabled={true}
                                    />
                                )

                            }
                            
                        </TableCell>
                        <TableCell>
                            <Button size="xs" variant="secondary" color="gray">
                                <a href={`/view/${item.postID}`}>View</a>
                            </Button>
                            &nbsp;
                            <ConfirmationModal postID={item.postID} />
                            <Button size="xs" variant="secondary" color="red" onClick={confirmationModal.onOpen}>
                                Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Card>
        </Card>
    );
  }
  

export default PostTable;