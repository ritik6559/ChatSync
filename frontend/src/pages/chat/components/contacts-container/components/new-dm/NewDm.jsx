import React, {useState} from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {FiEdit2} from "react-icons/fi";
import {FaPlus} from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import {SIGNUP_ROUTE} from "@/utils/constants.js";
import Lottie from "react-lottie";
import {animationDefaultOptions} from "@/lib/utils.js";

const NewDm = () => {

    const [openNewContact, setOpenNewContact] = useState(false);
    const searchContacts = async (searchTerm) => {}
    const [searchedContacts, setSearchedContacts] = useState([]);

    return (
       <>
           <TooltipProvider>
               <Tooltip>
                   <TooltipTrigger>
                       <FaPlus
                           className={"text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all"}
                           onClick={() => setOpenNewContact(true)}
                       />
                   </TooltipTrigger>
                   <TooltipContent
                       className={"bg-[#1c1b1e] border-none mb-2 p-3 text-white"}
                   >
                       Select New Contact
                   </TooltipContent>
               </Tooltip>
           </TooltipProvider>

           <Dialog open={openNewContact} onOpenChange={setOpenNewContact} >
               <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col" >
                   <DialogHeader>
                       <DialogTitle>
                           PLease select a contact
                       </DialogTitle>
                       <DialogDescription>
                       </DialogDescription>
                   </DialogHeader>
                   <div>
                       <Input
                           placeholder="Search Contacts"
                           className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                           onChange={(e) => searchContacts(e.target.value)}
                       />
                   </div>
                   {
                       searchedContacts.length <= 0 && ( <div className={"flex-1 justify-center items-center md:bg-[#181920] md:flex flex-col duration-1000 transition-all"} >
                           <Lottie
                               isClickToPauseDisabled={true}
                               height={100}
                               width={100}
                               options={animationDefaultOptions}
                           />
                           <div className={"text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-2xl text-xl transition-all duration-300 text-center"} >
                               <h3 className={"poppins-medium"} >
                                   Hi<span className={"text-purple-500"}>!</span>Search new
                                   <span className={"text-purple-500"}> Contact. </span>
                               </h3>
                           </div>
                       </div>
                       )
                   }
               </DialogContent>
           </Dialog>

       </>
    );
};

export default NewDm;
