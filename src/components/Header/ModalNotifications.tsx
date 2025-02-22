import CardNotification from "@components/CardNotification/CardNotification";

import imgPerfil from "../../../public/imgCard.png";
import { useUser } from "@hooks/useUser";

const ModalNotifications = () => {
  const { user } = useUser();

  const TOTAL_USER_FIELDS = user.isMentor ? 14 : 13;

  const thereAreFieldsToFill = Object.values(user).some((value) => {
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    return !value;
  });

  const isProfileCompleted = Object.values(user).length >= TOTAL_USER_FIELDS;

  return (
    <div className="flex flex-col px-12 gap-12">
      <h1 className=" self-start text-secondary-02 text-2xl font-bold">
        Notificações
      </h1>
      <div className="flex flex-col gap-8 ">
        {/* <span className="self-start text-secondary-02 text-2xl font-bold">
          Hoje
        </span> */}
        {!isProfileCompleted || thereAreFieldsToFill ? (
          <CardNotification
            description="Complete seu perfil!"
            name={user.firstName}
            imgUrl="/logoSvg.svg"
            alreadyViewed
            link="/profile"
          />
        ) : (
          <div className="max-w-xs border border-gray-03 flex justify-center items-center w-full h-[136px] rounded-lg px-4">
            <p className="text-center text-gray-03">
              Não possui nenhuma Notificação.
            </p>
          </div>
        )}
      </div>
      {/* <div className="flex flex-col gap-8 ">
        <span className="self-start text-secondary-02 text-2xl font-bold">
          Esta semana
        </span>
        <span>
          <CardNotification
            description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
            name="Gabriel Shiota"
            imgUrl={imgPerfil.src}
          />
        </span>
        <CardNotification
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
          name="Gabriel Shiota"
          imgUrl={imgPerfil.src}
          alreadyViewed
        />
        <CardNotification
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
          name="Gabriel Shiota"
          imgUrl={imgPerfil.src}
          alreadyViewed
        />
        <CardNotification
          description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet"
          name="Gabriel Shiota"
          imgUrl={imgPerfil.src}
          alreadyViewed
        />
      </div> */}
    </div>
  );
};

export default ModalNotifications;
