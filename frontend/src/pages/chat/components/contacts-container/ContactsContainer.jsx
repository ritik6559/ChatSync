import React, {useEffect} from 'react';
import ProfileInfo from "@/pages/chat/components/contacts-container/components/profile-info/ProfileInfo.jsx";
import NewDm from "@/pages/chat/components/contacts-container/components/new-dm/NewDm.jsx";
import apiClient from "@/lib/api-client.js";
import {GET_DM_CONTACTS_ROUTE} from "@/utils/constants.js";
import {useAppStore} from "@/store/index.js";
import ContactList from "@/components/contact-list.jsx";
import CreateChannel from "@/pages/chat/components/contacts-container/components/create-channel/CreateChannel.jsx";

const ContactsContainer = () => {

    const { directMessagesContacts, setDirectMessagesContacts } = useAppStore();

    useEffect(() => {
        const getContacts = async () => {
            const response = await apiClient.get(GET_DM_CONTACTS_ROUTE);
            console.log(response);
            if(response.data.contacts){
                setDirectMessagesContacts(response.data.contacts);
            }

        }

        getContacts();
    }, []);


    return (
        <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full" >
            <div className="pt-3" >
                <Logo />
            </div>
            <div className="my-3" >
                <div className="flex items-center justify-between pr-10" >
                    <Title text={"Direct Messages"} />
                    <NewDm />
                </div>
                <div className={" overflow-y-auto scrollbar-hidden"} >
                    <ContactList contacts={directMessagesContacts} />
                </div>
            </div>
            <div className="my-3" >
                <div className="flex items-center justify-between pr-10" >
                    <Title text={"CHANNELS"} />
                    <CreateChannel />
                </div>
            </div>
            <ProfileInfo />
        </div>
    );
};

export default ContactsContainer;

const Logo = () => {
    return (
        <div className={"flex p-5 justify-start items-center gap-2"} >
            <svg
                id="logo-38"
                width="78"
                height="32"
                viewBox="0 0 78 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {" "}
                <path
                    d="M55.5 0H77.5L58 32H36.5L55.5 02"
                    className="ccustom"
                    fill="#8338ec"
                >
                </path>{" "}
                <path
                    d="M35.5 0H51.5L32.5 32H16.5L35.5 02"
                    className="ccompli"
                    fill="#975aed"
                >
                </path>{" "}
                <path
                    d="M19.5 0H31.5L12.5 32H0.5L19.5 02"
                    className="ccompli2"
                    fill="#a16ee8"
                >
                </path>{" "}
            </svg>
            <span className="text-3xl font-semibold" >Chat Sync</span>
        </div>
    )
}

const Title = ({ text }) => {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm" >
            {text}
        </h6>
    )
}
