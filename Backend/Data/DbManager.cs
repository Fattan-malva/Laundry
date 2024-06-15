using System.Data;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;


public class DbManager
{
    private readonly string connectionString;
    private readonly MySqlConnection _connection;
    public DbManager(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
        _connection = new MySqlConnection(connectionString);
    }
    //OWNER================================================================================================
    public List<Owner> GetAllOwners()
    {
        List<Owner> ownerList = new List<Owner>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM Owner";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Owner owner = new Owner
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            namaowner = reader["Namaowner"].ToString(),
                            nohp = reader["Nohp"].ToString(),
                            tanggalmasuk = DateTime.Parse(reader["Tanggalmasuk"].ToString())

                        };
                        ownerList.Add(owner);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return ownerList;

    }

    public List<Owner> GetOwnersById(int id)
    {
        List<Owner> ownersList = new List<Owner>();
        try
        {
            using (MySqlConnection connection = _connection)
            {
                string query = "SELECT * FROM Owner WHERE Id = ?";
                MySqlCommand command = new MySqlCommand(query, connection);
                {
                    command.Parameters.AddWithValue("Id", id);
                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Owner info = new Owner
                            {
                                id = Convert.ToInt32(reader["Id"]),
                                namaowner = reader["Namaowner"].ToString(),
                                nohp = reader["Nohp"].ToString(),
                                tanggalmasuk = DateTime.Parse(reader["Tanggalmasuk"].ToString())
                            };
                            ownersList.Add(info);
                        }
                    }

                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return ownersList;

    }

    public int CreateOwner(Owner owner)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO owner (namaowner,nohp,tanggalmasuk) VALUES (@Namaowner,@Nohp,@Tanggalmasuk)";
            using MySqlCommand command = new MySqlCommand(query, connection);
            {
                command.Parameters.AddWithValue("@Namaowner", owner.namaowner);
                command.Parameters.AddWithValue("@Nohp", owner.nohp);
                command.Parameters.AddWithValue("@Tanggalmasuk", owner.tanggalmasuk);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int UpdateOwner(Owner owner)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE owner SET namaowner=@Namaowner, nohp=@Nohp, tanggalmasuk=@Tanggalmasuk WHERE id=@Id";
            using MySqlCommand command = new MySqlCommand(query, connection);
            {
                command.Parameters.AddWithValue("@Namaowner", owner.namaowner);
                command.Parameters.AddWithValue("@Nohp", owner.nohp);
                command.Parameters.AddWithValue("@Tanggalmasuk", owner.tanggalmasuk);
                command.Parameters.AddWithValue("@Id", owner.id);


                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int DeleteOwner(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "DELETE FROM owner WHERE id=@Id";
            using MySqlCommand command = new MySqlCommand(query, connection);
            {
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    //UNIT====================================================================================================================

    public class UnitNama
    {
        public int id { get; set; }
        public string? idpelanggan { get; set; }
        public int berat { get; set; }
        public string? namabarang { get; set; }
    }
    public List<UnitNama> GetAllUnits()
    {
        List<UnitNama> unitnamaList = new List<UnitNama>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                // Menggunakan JOIN untuk memastikan idpelanggan sama dengan idowner
                string query = @"
                    SELECT 
                        unit.id AS Id, 
                        owner.namaowner AS Idpelanggan, 
                        unit.berat AS Berat, 
                        unit.namabarang AS Namabarang 
                    FROM 
                        unit 
                    JOIN 
                        owner ON unit.idpelanggan = owner.id";

                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        UnitNama unit = new UnitNama
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            idpelanggan = reader["Idpelanggan"].ToString(),
                            berat = Convert.ToInt32(reader["Berat"]),
                            namabarang = reader["Namabarang"].ToString()
                        };
                        unitnamaList.Add(unit);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return unitnamaList;
    }
    public List<Unit> GetUnitsById(int id)
    {
        List<Unit> unitsList = new List<Unit>();
        try
        {
            using (MySqlConnection connection = _connection)
            {
                string query = "SELECT * FROM Unit WHERE Id = ?";
                MySqlCommand command = new MySqlCommand(query, connection);
                {
                    command.Parameters.AddWithValue("Id", id);
                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Unit info = new Unit
                            {
                                id = Convert.ToInt32(reader["Id"]),
                                idpelanggan = Convert.ToInt32(reader["Idpelanggan"]),
                                // idpelanggan = reader["Idpelanggan"].ToString(),
                                berat = Convert.ToInt32(reader["Berat"]),
                                namabarang = reader["Namabarang"].ToString(),

                            };
                            unitsList.Add(info);
                        }
                    }

                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return unitsList;

    }
    public int CreateUnit(Unit unit)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO unit (idpelanggan,berat,namabarang) VALUES (@Idpelanggan,@Berat,@Namabarang)";
            using MySqlCommand command = new MySqlCommand(query, connection);
            {
                command.Parameters.AddWithValue("@Idpelanggan", unit.idpelanggan);
                command.Parameters.AddWithValue("@Berat", unit.berat);
                command.Parameters.AddWithValue("@Namabarang", unit.namabarang);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
    public int UpdateUnit(Unit unit)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE unit SET  idpelanggan=@Idpelanggan, berat=@Berat,namabarang=@Namabarang WHERE id=@Id";
            using MySqlCommand command = new MySqlCommand(query, connection);
            {
                command.Parameters.AddWithValue("@Idpelanggan", unit.idpelanggan);
                command.Parameters.AddWithValue("@Berat", unit.berat);
                command.Parameters.AddWithValue("@Namabarang", unit.namabarang);
                command.Parameters.AddWithValue("@Id", unit.id);


                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int DeleteUnit(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "DELETE FROM unit WHERE id=@Id";
            using MySqlCommand command = new MySqlCommand(query, connection);
            {
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
    //DATA LAUNDRY=========================================================================================================================


    public class DataLaundryNama
    {

        public int id { get; set; }
        public string idowner { get; set; }
        public string idbarang { get; set; }
        public int hargaperkg { get; set; }
        public int hargatotal { get; set; }
        public string idtanggalmasuk { get; set; }
        public DateTime tanggalkeluar { get; set; }
    }
    public List<DataLaundryNama> GetAllDataLaundrys()
    {
        List<DataLaundryNama> datalaundrynamaList = new List<DataLaundryNama>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = @"
                SELECT 
                    datalaundry.id AS Id, 
                    owner.namaowner AS Idowner, 
                    unit.namabarang AS Idbarang, 
                    datalaundry.hargaperkg AS Hargaperkg, 
                    (datalaundry.hargaperkg * unit.berat) AS Hargatotal, 
                    owner.tanggalmasuk AS Tanggalmasuk,
                    datalaundry.tanggalkeluar AS Tanggalkeluar 
                FROM 
                    datalaundry 
                JOIN 
                    owner ON datalaundry.idowner = owner.id 
                JOIN 
                    unit ON datalaundry.idbarang = unit.id";

                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        DataLaundryNama datalaundry = new DataLaundryNama
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            idowner = reader["Idowner"].ToString(),
                            idbarang = reader["Idbarang"].ToString(),
                            hargaperkg = Convert.ToInt32(reader["Hargaperkg"]),
                            hargatotal = Convert.ToInt32(reader["Hargatotal"]),
                            idtanggalmasuk = reader["Tanggalmasuk"].ToString(),
                            // idtanggalmasuk = DateTime.Parse(reader["Tanggalmasuk"].ToString()),
                            tanggalkeluar = DateTime.Parse(reader["Tanggalkeluar"].ToString()),
                        };
                        datalaundrynamaList.Add(datalaundry);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return datalaundrynamaList;
    }
  public int CreateDataLaundry(DataLaundry dataLaundry)
{
    using (MySqlConnection connection = _connection)
    {
        string query = "INSERT INTO dataLaundry (idowner, idbarang, hargaperkg, idtanggalmasuk, tanggalkeluar) VALUES (@Idowner, @Idbarang, @Hargaperkg, @Tanggalmasuk, @Tanggalkeluar)";
        using (MySqlCommand command = new MySqlCommand(query, connection))
        {
            command.Parameters.AddWithValue("@Idowner", dataLaundry.idowner);
            command.Parameters.AddWithValue("@Idbarang", dataLaundry.idbarang);
            command.Parameters.AddWithValue("@Hargaperkg", dataLaundry.hargaperkg);
            command.Parameters.AddWithValue("@Tanggalmasuk", dataLaundry.idtanggalmasuk);  // Ensure this matches the correct property
            command.Parameters.AddWithValue("@Tanggalkeluar", dataLaundry.tanggalkeluar); // Ensure this matches the correct property

            connection.Open();
            return command.ExecuteNonQuery();
        }
    }
}




}

