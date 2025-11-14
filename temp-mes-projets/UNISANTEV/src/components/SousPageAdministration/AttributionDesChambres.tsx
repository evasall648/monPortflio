import React, { useState } from "react";

interface RoomAssignment {
  roomNo: number;
  patientName: string;
  roomType: string;
  bedNo: number;
  birthday: string;
  gender: string;
  mobile: string;
  assignedDoctor: string;
  status: string;
  amount: number;
}

const initialRooms: RoomAssignment[] = [
  { roomNo: 101, patientName: "Malick Fall", roomType: "luxe", bedNo: 1, birthday: "02/25/2004", gender: "M", mobile: "77 234 5678", assignedDoctor: "Fatou Badji", status: "Disponible", amount: 100 },
  { roomNo: 102, patientName: "Aissatou Ba", roomType: "Standard", bedNo: 5, birthday: "03/01/2001", gender: "F", mobile: "76 421 3456", assignedDoctor: "Mody Yero Ndiaye", status: "Réservé", amount: 800 },
  { roomNo: 103, patientName: "Khalilou Tall", roomType: "luxe", bedNo: 7, birthday: "03/10/1999", gender: "M", mobile: "70 212 7890", assignedDoctor: "Awa Sall", status: "Entretien", amount: 200 },
  { roomNo: 104, patientName: "Rokhaya Sy", roomType: "Standard", bedNo: 4, birthday: "03/20/1998", gender: "F", mobile: "70 212 7890", assignedDoctor: "Hwa Demba Keita", status: "Disponible", amount: 900 },
  { roomNo: 105, patientName: "Astou faye", roomType: "luxe", bedNo: 6, birthday: "03/25/2005", gender: "F", mobile: "70 212 7890", assignedDoctor: "Linda Bassène", status: "Disponible", amount: 250 },
  { roomNo: 106, patientName: "Fatou Ndour", roomType: "Standard", bedNo: 3, birthday: "04/01/2000", gender: "F", mobile: "70 212 7890", assignedDoctor: "Mariama Kane", status: "Disponible", amount: 120 },
  { roomNo: 107, patientName: "Awa Fall", roomType: "luxe", bedNo: 8, birthday: "04/10/1987", gender: "F", mobile: "70 212 7890", assignedDoctor: "Khadidiatou Diallo", status: "Réservé", amount: 220 },
  { roomNo: 108, patientName: "Modou Sagnane", roomType: "Standard", bedNo: 2, birthday: "04/15/1987", gender: "M", mobile: "70 212 7890", assignedDoctor: "Danicha Bakana", status: "Entretien", amount: 850 },
  { roomNo: 109, patientName: "Ramatoulaye Makaya", roomType: "luxe", bedNo: 5, birthday: "05/01/2007", gender: "F", mobile: "70 212 7890", assignedDoctor: "Marie Claire Mendy", status: "Disponible", amount: 180 },
  { roomNo: 110, patientName: "Léopold Senghor", roomType: "Standard", bedNo: 9, birthday: "05/10/2001", gender: "M", mobile: "70 212 7890", assignedDoctor: "Ndeye Awa Dieng", status: "Entretien", amount: 700 },
];

const AttributionDesChambres: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState<RoomAssignment[]>(initialRooms);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomAssignment | null>(null);

  const handleDelete = (roomNo: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      setRooms(rooms.filter(room => room.roomNo !== roomNo));
    }
  };

  const handleEdit = (room: RoomAssignment) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const newRoom = {
      roomNo: Number(formData.get("roomNo")),
      patientName: formData.get("patientName") as string,
      roomType: formData.get("roomType") as string,
      bedNo: Number(formData.get("bedNo")),
      birthday: formData.get("birthday") as string,
      gender: formData.get("gender") as string,
      mobile: formData.get("mobile") as string,
      assignedDoctor: formData.get("assignedDoctor") as string,
      status: formData.get("status") as string,
      amount: Number(formData.get("amount"))
    };

    setRooms(prevRooms => 
      editingRoom 
        ? prevRooms.map(room => room.roomNo === editingRoom.roomNo ? newRoom : room)
        : [...prevRooms, newRoom]
    );
    setShowModal(false);
    setEditingRoom(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingRoom(null);
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto" style={{ maxHeight: "500px" }}>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">
              {editingRoom ? "Modifier Chambre" : "Ajouter Chambre"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <label className="block mb-1">Numéro de chambre*</label>
                <input 
                  name="roomNo"
                  type="number" 
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.roomNo}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Nom du patient*</label>
                <input 
                  name="patientName"
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.patientName}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Type de chambre*</label>
                <select 
                  name="roomType" 
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.roomType}
                  required
                >
                  <option value="luxe">Luxe</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Numéro de lit*</label>
                <input 
                  name="bedNo"
                  type="number" 
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.bedNo}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Date de naissance*</label>
                <input 
                  name="birthday"
                  type="text" 
                  placeholder="MM/DD/YYYY"
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.birthday}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Genre*</label>
                <select 
                  name="gender" 
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.gender}
                  required
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Téléphone*</label>
                <input 
                  name="mobile"
                  type="tel" 
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.mobile}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Médecin assigné*</label>
                <input 
                  name="assignedDoctor"
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.assignedDoctor}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Statut*</label>
                <select 
                  name="status" 
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.status}
                  required
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Réservé">Réservé</option>
                  <option value="Entretien">Entretien</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Montant*</label>
                <input 
                  name="amount"
                  type="number" 
                  className="w-full border rounded p-1"
                  defaultValue={editingRoom?.amount}
                  required
                />
              </div>

              <div className="col-span-2 flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par N° Chambre"
              className="border rounded px-2 py-1 pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
        >
          <span className="mr-2">+</span> Ajouter Chambre
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full">
          <thead>
            
            <tr className="border-b bg-gray-50">
              <th className="p-2 text-left">N°Chambre</th>
              <th className="p-2 text-left">Nom du patient</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">N°Lit</th>
              <th className="p-2 text-left">Naissance</th>
              <th className="p-2 text-left">Genre</th>
              <th className="p-2 text-left">Téléphone</th>
              <th className="p-2 text-left">Médecin</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms
              .filter(room => room.roomNo.toString().includes(searchTerm))
              .map((room, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2">{room.roomNo}</td>
                  <td className="p-2">{room.patientName}</td>
                  <td className="p-2">{room.roomType}</td>
                  <td className="p-2">{room.bedNo}</td>
                  <td className="p-2">{room.birthday}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded ${room.gender === "M" ? "bg-green-100" : "bg-pink-100"}`}>
                      {room.gender}
                    </span>
                  </td>
                  <td className="p-2">{room.mobile}</td>
                  <td className="p-2">{room.assignedDoctor}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded ${
                      room.status === "Entretien" ? "bg-green-100 text-green-800" :
                      room.status === "Réservé" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(room)}
                      className="text-green-500 hover:text-green-700"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(room.roomNo)}
                      className="text-red-500 hover:text-red-700"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table> 
      </div>
    </div>
  );
};

export default AttributionDesChambres;