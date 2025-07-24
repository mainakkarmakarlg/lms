const UserNotFound = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-fit w-fit flex items-center justify-center flex-col space-y-5 p-5  rounded-md">
        <img
          className="h-[300px] w-[300px] md:h-[500px] md:w-[500px] object-contain"
          src="/no-user-found.svg"
          alt="user-not-found"
        />
        <h1 className="text-3xl text-center font-semibold">No User Found</h1>
        <p className="text-lg text-center">
          Please contact the Technical Support
        </p>
      </div>
    </div>
  );
};

export default UserNotFound;
