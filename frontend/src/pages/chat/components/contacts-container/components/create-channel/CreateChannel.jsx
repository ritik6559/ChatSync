import React, {useEffect, useState} from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {FaPlus} from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import {CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS} from "@/utils/constants.js";
import apiClient from "@/lib/api-client.js";
import Multiselect from "@/components/ui/multiselect.jsx";
import {toast} from "sonner";
import {useAppStore} from "@/store/index.js";

const CreateChannel = () => {

    const [newChannelModal, setNewChannelModal] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    const { addChannel } = useAppStore();

    useEffect(() => {
        const getData = async () => {
            const response = await apiClient.get(GET_ALL_CONTACTS);
            setAllContacts(response.data.contacts);
        }
        getData();
    }, []);

    const createChannel = async () => {
        try{

            if( channelName.length > 0 && allContacts.length > 0 ){
                const response = await apiClient.post(CREATE_CHANNEL_ROUTE, {
                    name: channelName,
                    members: selectedContacts.map(c => c.value),
                });

                if( response.status === 201 ) {
                    console.log(response.data.channel);
                    setChannelName("");
                    setAllContacts([]);
                    setNewChannelModal(false);
                    addChannel(response.data.channel);
                }
            } else {
                toast.error("All fields are required");
            }
        } catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className={"text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all"}
                            onClick={() => setNewChannelModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent
                        className={"bg-[#1c1b1e] border-none mb-2 p-3 text-white"}
                    >
                        Create New Channel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={newChannelModal} onOpenChange={setNewChannelModal} >
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col" >
                    <DialogHeader>
                        <DialogTitle>
                            Please fill up details for new channel.
                        </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Channel Name"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => setChannelName(e.target.value)}
                            value={channelName}
                        />
                    </div>
                    <div>
                        <Multiselect
                            clasName="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                            defaultOptions={allContacts}
                            placeholder="Search Contacts"
                            value={selectedContacts}
                            onChange={setSelectedContacts}
                            emptyIndicator={
                                <p
                                    className={"text-center text-lg leading-10 text-gray-600"}
                                >No results found</p>
                            }

                        />
                    </div>
                    <div
                        className="mt-auto"
                        onClick={createChannel}
                    >
                        <button
                            className={"w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 rounded-md p-2"}
                        >
                            Create Channel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateChannel;
