export default function Footer() {
  return (
    <>
      <div className="dark:bg-[#111827] dark:text-white p-5">
        <h4>Get the FreshCart app</h4>
        <p className="text-gray-500 px-4">
          We will send you a link , open it in your phone to download the app.
        </p>

        <div className="flex flex-col my-2 md:flex-row md:justify-between md:items-center ">
          <form className=" w-full md:w-[70%] my-2">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="email-address-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@mail.com"
              />
            </div>
          </form>
          <button className="bg-green-900 text-white text-center px-3 py-2 rounded-xl">
            Share App Link
          </button>
        </div>
      </div>
    </>
  );
}
