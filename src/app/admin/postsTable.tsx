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
import { useState } from "react";
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
import { SafePost } from "../types";
import useConfirmationModal from "../hooks/useConfirmationModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { redirect } from "next/navigation";
  
const colors: { [key: string]: Color } = {
Verification: "gray",
Active: "emerald",
};

interface PostTableProps {
    posts: SafePost[];
}

  
const PostTable: React.FC<PostTableProps> = ({
    posts
}) => {

    const [search, setSearch] = useState("");
    const [displayPosts, setDisplayPosts] = useState(posts);
    const [isLoading, setIsLoading] = useState(false);

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
                        <TableHeaderCell>Post ID</TableHeaderCell>
                        <TableHeaderCell>Author</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {displayPosts.map((item) => (
                        <TableRow key={item.id}>
                        <TableCell>{item.postID}</TableCell>
                        <TableCell>{item.authorName}</TableCell>
                        <TableCell>
                            {
                                item.published ? (
                                    <Badge color="gray" size="xs">
                                        Published
                                    </Badge>
                                ) : (
                                    <Badge color="gray" size="xs">
                                        Draft
                                    </Badge>
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