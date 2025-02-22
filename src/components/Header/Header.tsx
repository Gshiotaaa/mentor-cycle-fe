import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { initialValue } from "providers/user/AppContext";
import { useEffect, useState } from "react";
import { BsFillHouseDoorFill, BsFillPeopleFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import Modal from "@components/Modal/Modal";
import NavBar from "@components/NavBar/NavBar";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useUser } from "@hooks/useUser";
import { LOGOUT_USER } from "services/apollo/mutations";
import { GET_ME } from "services/apollo/queries";
import ModalNotifications from "./ModalNotifications";
import ModalSettings from "./ModalSettings";

const linkStyle = "flex items-center justify-center";
const itemsMenuStyle =
  "flex gap-2 items-center justify-center hover:text-gray-04";

export default function Header() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [toggleMenuProfile, setToggleMenuProfile] = useState(false);
  const [showModal, setShowModal] = useState<string>();

  const [signOutUser] = useMutation(LOGOUT_USER);
  const [me, { data }] = useLazyQuery(GET_ME);

  useEffect(() => {
    if (!user.isLogged) {
      me();
    }
    if (data) {
      setUser({
        firstName: data.me.firstName,
        lastName: data.me.lastName,
        photoUrl: data.me.photoUrl,
        biography: data.me.biography,
        description: data.me.description,
        country: data.me.country,
        state: data.me.state,
        yearsOfExperience: data.me.yearsOfExperience,
        skills: data.me.skills,
        github: data.me.github,
        email: data.me.email,
        jobTitle: data.me.jobTitle,
        isMentor: data.me.isMentor,
        id: data.me.id,
        isLogged: true,
      });
    }
  }, [data, user.isLogged, me, router, setUser]);

  const menuOptions: Array<{
    text: string;
    action: keyof typeof menuClickActions;
  }> = [
    { text: "Editar Perfil", action: "editprofile" },
    { text: "Configurações", action: "settings" },
    { text: "Sair", action: "logout" },
  ];

  const [itemsMenu, setItemsMenu] = useState({ text: "", action: "" });

  const logOutUser = () => async () => {
    await signOutUser();
    setUser(initialValue);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const menuClickActions = {
    editprofile: () => router.push("/profile"),
    settings: () => {
      setShowModal("settings");
      setToggleMenuProfile(false);
    },
    // theme: () => setDarkMode(!darkMode),
    // changeprofile: () => console.log("trocar de perfil"),
    logout: logOutUser(),
  };

  const handleValueChange = (value: string) => {
    const item = menuOptions.find((item) => item.action === value);
    if (item) {
      menuClickActions[item.action]();
    }
  };

  const { isLogged, firstName, lastName, photoUrl, isMentor, email, id } = user;

  return (
    <header className="flex justify-center w-full h-20 bg-neutral-01 border-gray-02 border-b m-auto sticky top-0 z-10">
      <div className="flex justify-between items-center w-full container">
        <div className="w-1/5 h-full hidden sm:flex justify-start items-center">
          <Link href="/dashboard">
            <Image
              src={"/logoSvg.svg"}
              width={64}
              height={56}
              alt="MentorCycle logo"
              className="object-contain"
            />
          </Link>
        </div>
        {isLogged && (
          <ul className="flex justify-evenly sm:justify-end items-center w-full space-x-10">
            <li className={linkStyle}>
              <Link className={itemsMenuStyle} href="/dashboard">
                <BsFillHouseDoorFill size={24} />
                <span className="hidden lg:inline-block">Home</span>
              </Link>
            </li>
            <li className={linkStyle}>
              <button
                className={itemsMenuStyle}
                onClick={() => {
                  setShowModal("notifications");
                  setToggleMenuProfile(false);
                }}
              >
                <MdNotifications size={24} />
                <span className="hidden lg:inline-block">Notificações</span>
              </button>
            </li>
            <li className={linkStyle}>
              <Link className={itemsMenuStyle} href="/mentors">
                <BsFillPeopleFill size={24} />
                <span className="hidden lg:inline-block">Mentores</span>
              </Link>
            </li>
            <li className={clsx(linkStyle)}>
              <div className="flex justify-center items-center">
                <figure className="rounded-full w-9 h-9 overflow-hidden mr-2 hidden sm:inline-block">
                  <Image
                    src={photoUrl || "/imgCard.png"}
                    width={100}
                    height={100}
                    alt="userPhoto"
                    className="object-cover"
                  />
                </figure>

                <div className="flex justify-center items-center">
                  <div className="flex flex-col justify-center items-start">
                    <h1 className="hidden sm:inline-block">
                      {firstName} {lastName}
                    </h1>
                    <span
                      className={clsx(
                        "text-xs text-primary-04 hidden sm:inline-block",
                        {
                          isMentor: "text-primary-03",
                        }
                      )}
                    >
                      {isMentor ? "Mentor" : "Mentorado"}
                    </span>
                  </div>
                </div>
                <NavBar
                  isOpen={toggleMenuProfile}
                  setIsOpen={setToggleMenuProfile}
                  value={itemsMenu}
                  itemsMenu={menuOptions}
                  handleValueChange={handleValueChange}
                />
              </div>
            </li>
          </ul>
        )}
        {showModal === "notifications" && (
          <Modal open={true} onOpenChange={() => setShowModal("")}>
            {<ModalNotifications />}
          </Modal>
        )}
        {showModal === "settings" && (
          <Modal open={isModalOpen} onOpenChange={() => setShowModal("")}>
            {
              <ModalSettings
                setIsModalOpen={setIsModalOpen}
                firstName={firstName}
                email={email}
                id={id}
                lastName={lastName}
              />
            }
          </Modal>
        )}
      </div>
    </header>
  );
}
