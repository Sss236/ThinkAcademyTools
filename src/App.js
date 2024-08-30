import { useState } from 'react';

const users = [
    {
      "id": 1,
      "name": "Emily Chen",
      "age": 28,
      "occupation": "Software Engineer"
    },
    {
      "id": 2,
      "name": "Ryan Thompson",
      "age": 32,
      "occupation": "Marketing Manager"
    },
    {
      "id": 3,
      "name": "Sophia Patel",
      "age": 25,
      "occupation": "Data Analyst"
    },
    {
      "id": 4,
      "name": "Michael Lee",
      "age": 41,
      "occupation": "CEO"
    },
    {
      "id": 5,
      "name": "Olivia Brown",
      "age": 29,
      "occupation": "Graphic Designer"
    },
    {
      "id": 6,
      "name": "Alexander Hall",
      "age": 38,
      "occupation": "Sales Representative"
    },
    {
      "id": 7,
      "name": "Isabella Davis",
      "age": 26,
      "occupation": "Teacher"
    },
    {
      "id": 8,
      "name": "Ethan White",
      "age": 35,
      "occupation": "Lawyer"
    },
    {
      "id": 9,
      "name": "Lily Tran",
      "age": 30,
      "occupation": "Nurse"
    },
    {
      "id": 10,
      "name": "Julian Sanchez",
      "age": 39,
      "occupation": "Engineer"
    },
    {
      "id": 11,
      "name": "Ava Martin",
      "age": 27,
      "occupation": "Journalist"
    },
    {
      "id": 12,
      "name": "Benjamin Walker",
      "age": 42,
      "occupation": "Doctor"
    },
    {
      "id": 13,
      "name": "Charlotte Brooks",
      "age": 31,
      "occupation": "HR Manager"
    },
    {
      "id": 14,
      "name": "Gabriel Harris",
      "age": 36,
      "occupation": "IT Consultant"
    },
    {
      "id": 15,
      "name": "Hannah Taylor",
      "age": 24,
      "occupation": "Student"
    },
    {
      "id": 16,
      "name": "Jackson Brown",
      "age": 40,
      "occupation": "Business Owner"
    },
    {
      "id": 17,
      "name": "Kayla Lewis",
      "age": 33,
      "occupation": "Event Planner"
    },
    {
      "id": 18,
      "name": "Logan Mitchell",
      "age": 37,
      "occupation": "Architect"
    },
    {
      "id": 19,
      "name": "Mia Garcia",
      "age": 29,
      "occupation": "Artist"
    },
    {
      "id": 20,
      "name": "Natalie Hall",
      "age": 34,
      "occupation": "Teacher"
    },
    {
      "id": 21,
      "name": "Oliver Patel",
      "age": 38,
      "occupation": "Software Developer"
    },
    {
      "id": 22,
      "name": "Penelope Martin",
      "age": 26,
      "occupation": "Writer"
    },
    {
      "id": 23,
      "name": "Quinn Lee",
      "age": 35,
      "occupation": "Entrepreneur"
    },
    {
      "id": 24,
      "name": "Rachel Kim",
      "age": 30,
      "occupation": "Dentist"
    },
    {
      "id": 25,
      "name": "Samuel Jackson",
      "age": 42,
      "occupation": "Lawyer"
    },
    {
      "id": 26,
      "name": "Tessa Hall",
      "age": 28,
      "occupation": "Graphic Designer"
    },
    {
      "id": 27,
      "name": "Uma Patel",
      "age": 39,
      "occupation": "Marketing Manager"
    },
    {
      "id": 28,
      "name": "Vincent Brooks",
      "age": 36,
      "occupation": "IT Consultant"
    },
    {
      "id": 29,
      "name": "Walter White",
      "age": 41,
      "occupation": "Engineer"
    },
    {
      "id": 30,
      "name": "Xavier Sanchez",
      "age": 33,
      "occupation": "Sales Representative"
    },
    {
      "id": 31,
      "name": "Yvonne Martin",
      "age": 29,
      "occupation": "Teacher"
    },
    {
      "id": 32,
      "name": "Zoe Lee",
      "age": 27,
      "occupation": "Data Analyst"
    },
    {
      "id": 33,
      "name": "Abigail Brown",
      "age": 34,
      "occupation": "Nurse"
    },
    {
      "id": 34,
      "name": "Caleb Harris",
      "age": 38,
      "occupation": "Business Owner"
    },
    {
      "id": 35,
      "name": "Diana Taylor",
      "age": 31,
      "occupation": "Event Planner"
    },
    {
      "id": 36,
      "name": "Eleanor Walker",
      "age": 40,
      "occupation": "CEO"
    }
  ]

export default function App() {
  return(
    <Pagination users={users} />
  );
}
const Pagination = ({users}) => {
    const[numPerPage, setNumPerPage] = useState(10);
    const[currentPage, setCurrentPage] = useState(1);

    const columns = ["Id", "Name", "Age", "Occupation"];
    return(
        <div style={{margin: "50px"}}>
            <table>
                <tr>
                    {columns.map(col => 
                        <th>{col}</th>
                    )}
                </tr>
                {users.slice((currentPage-1) * numPerPage, currentPage * numPerPage).map(((user, index) => 
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.occupation}</td>
                    </tr>
                ))}
            </table>
            
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <label>
                    Display 
                    <select 
                        value={numPerPage}
                        onChange={e => setNumPerPage(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                     per page
                </label>
                <div>
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage => currentPage - 1)}>prev</button>
                    {currentPage}
                    <button disabled={currentPage >= (users.length / numPerPage)} onClick={() => setCurrentPage(currentPage => currentPage + 1)}>next</button>
                </div>
            </div>
        </div>
    );
}


