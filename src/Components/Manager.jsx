import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
const Manager = () => {
  const [form, setForm] = useState({ url: "", username: "", password: "" , id: ""});
  const [passwordArray, setPasswordArray] = useState([]);
  const eyeRef = useRef(null);
  const passRef = useRef(null);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (
      form.password.length > 4 &&
      form.username.length > 3 &&
      form.url.length > 3
    ) {

      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: form.id }),
      });
      
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      toast.success("Password Added Successfully");
      setForm({ url: "", username: "", password: "" ,id:""});
    } else {
      toast.error("Please Enter Valid Details");
    }
  };

  const editPassword = (id) => {
    setForm({...passwordArray.filter((item) => item.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    console.log("Password Edited Successfully", id);
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,  id: uuidv4() }]));
    // console.log([...passwordArray, form]);
    // setForm({ url: "", username: "", password: "" });
  };

  const deletePassword = async (id) => {
    console.log("Password Deleted");
    confirm("Are you sure you want to delete this password?");
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    let res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
    // );

    // console.log([...passwordArray, form]);
    // setForm({ url: "", username: "", password: "" });
  };
  const showPassword = () => {
    if (eyeRef.current.src.includes("img/eye-crossed.png")) {
      eyeRef.current.src = "img/eye.png";
      passRef.current.type = "password";
    } else {
      eyeRef.current.src = "img/eye-crossed.png";
      passRef.current.type = "text";
    }
  };

  const copyText = (text) => {
    toast("Copied to Clipboard: " + text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div
          className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px]
   -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"
        />
      </div>
      <div className="md:mycontainer px-2 md:px-0 min-h-[81.4vh]">
        <h1 className="text-black text-center font-bold text-3xl mb-6">
          <span className="text-lime-300 ">&lt;</span>
          <span>PassThe</span>
          <span className="text-lime-300">Key</span>
          <span className="text-lime-300">/&gt;</span>
        </h1>
        <p className="text-black text-center font-bold text-xl mb-6">
          your own password manager
        </p>
        <div className="flex flex-col  text-black w-full  md p-6 ">
          <input
            type="text"
            className="bg-white  rounded-full mb-6 border-2 border-lime-300  p-2 px-4"
            placeholder="Enter website URL"
            name="url"
            onChange={handleChange}
            value={form.url}
          />
          <div className="flex items-center justify-around content-center w-ful ">
            <input
              type="text"
              className="bg-white rounded-full border-2 w-[60%] mb-6 border-lime-300  p-2 "
              placeholder="Enter UserName"
              name="username"
              onChange={handleChange}
              value={form.username}
            />
            <div className="relative w-[40%] ml-6 mb-6">
              <input
                ref={passRef}
                type="password"
                className="bg-white rounded-full border-2 w-full border-lime-300  p-2 "
                placeholder="Enter your Password"
                name="password"
                onChange={handleChange}
                value={form.password}
              />
              <span
                className="absolute top-3 right-4 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={eyeRef} src="img/eye.png" alt="eye" className="p-1" />
              </span>
            </div>
          </div>
          <button
            className=" border-2 w-[25%]  text-black hover:border-lime-300 justify-center text-center rounded-full p-2 mt-4"
            onClick={handleSubmit}
          >
            <span className="text-lime-300  ">&lt;</span>

            <span>Add</span>
            <span className="text-lime-300 font-semibold"> Password</span>
            <span className="text-lime-300">/&gt;</span>
          </button>
        </div>
        <div className="md:mycontainer ">
          <div className="font-extrabold border-b border-white p-2">
            <span className="text-lime-300 ">&lt;</span>
            <span>Your</span>
            <span className="text-lime-300"> PassWords</span>
            <span className="text-lime-300">/&gt;</span>
          </div>
          {passwordArray.length === 0 ? (
            <div className="fornt-semibold  p-2">Nothing To Show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-lime-300 items-center justify-around   ">
                <tr className="items-center ">
                  <th className="text-center w-32 py-2">URL</th>
                  <th className="text-center w-32">UserName</th>
                  <th className="text-center w-32">PassWord</th>
                  <th className="text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-lime-100  ">
                {passwordArray.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-white justify-center items-center text-center"
                  >
                    <td className="">
                      <div className="flex py-2 justify-center items-center text-center">
                        <a className="" href={item.url} target="_blank">
                          {item.url}
                        </a>
                        <div
                          className="size-6 cursor-pointer "
                          onClick={() => {
                            copyText(item.url);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "4px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex  text-center justify-center">
                        <span>{item.username} </span>
                        <div
                          className="size-6 cursor-pointer "
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "4px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex  text-center justify-center">
                        <span>{item.password} </span>
                        <div
                          className="size-6 cursor-pointer "
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "4px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex  text-center justify-center">
                        <div
                          className="size-9 cursor-pointer "
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/omiqopzf.json"
                            trigger="hover"
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "4px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                        <div
                          className="size-9 cursor-pointer "
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "4px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>{" "}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
