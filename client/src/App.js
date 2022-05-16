import Axios from "axios";
import { useEffect, useState } from "react";
import InputEmployee from "./components/InputEmployee";

function App() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);

    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/employees").then((response) => {
            setEmployeeList(response.data);
        });
    }, []);

    const addEmployee = () => {
        if (
            name !== "" &&
            age !== 0 &&
            country !== "" &&
            position !== "" &&
            wage !== 0
        ) {
            Axios.post("http://localhost:3001/create", {
                name: name,
                age: age,
                country: country,
                position: position,
                wage: wage,
            }).then(() => {
                alert("Successfully added employee.");
                setEmployeeList([
                    ...employeeList,
                    {
                        name: name,
                        age: age,
                        country: country,
                        position: position,
                        wage: wage,
                    },
                ]);
            });
        } else {
            alert("Please fill in all the forms.");
        }
    };

    return (
        <div className="App px-5 pt-5 pb-10 flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <p className="text-2xl font-black">Simple CRUD Application</p>
                <hr className="my-6 border-t border-gray-300" />
            </div>

            <div className="w-full max-w-7xl">
                <div className="w-80 mr-10">
                    <p className="text-xl font-medium mb-4">Add employee</p>
                    <div className="flex flex-col">
                        <InputEmployee
                            title="Name"
                            type="text"
                            setstate={(e) => setName(e.target.value)}
                        />
                        <InputEmployee
                            title="Age"
                            type="number"
                            setstate={(e) => setAge(e.target.value)}
                        />
                        <InputEmployee
                            title="Country"
                            type="text"
                            setstate={(e) => setCountry(e.target.value)}
                        />
                        <InputEmployee
                            title="Position"
                            type="text"
                            setstate={(e) => setPosition(e.target.value)}
                        />
                        <InputEmployee
                            title="Wage (year)"
                            type="number"
                            setstate={(e) => setWage(e.target.value)}
                        />
                        <button
                            className="mt-4 w-40 bg-green-500 text-white py-2 rounded-[3px] hover:bg-green-600 transition-colors"
                            onClick={addEmployee}
                        >
                            Add Employee
                        </button>
                    </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div>
                    <div className="flex justify-between">
                        <p className="text-xl font-medium mb-4">Employees</p>

                        {/* <button
                            className="border w-40 text-blue-600 py-2 rounded-[3px] focus:ring-2 mb-8"
                            onClick={getEmployees}
                        >
                            Show Employees
                        </button> */}
                    </div>

                    <div className="grid grid-cols-8 border pl-4 font-medium py-2 border-gray-300">
                        <p className="w-3">#</p>
                        <p>Name</p>
                        <p>Age</p>
                        <p className="col-span-2">Country</p>
                        <p className="col-span-2">Position</p>
                        <p>Wage</p>
                    </div>
                    {employeeList.map((employee, index) => {
                        return (
                            <div
                                key={employee.id}
                                className="grid grid-cols-8 py-2 border-l border-r pl-4 border-b border-gray-300"
                            >
                                <p>{index + 1}</p>
                                <p>{employee.name}</p>
                                <p>{employee.age}</p>
                                <p className="col-span-2">{employee.country}</p>
                                <p className="col-span-2">
                                    {employee.position}
                                </p>
                                <p>{employee.wage}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
