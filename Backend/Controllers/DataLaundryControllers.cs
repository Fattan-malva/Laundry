using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Ocsp;
using System;
using System.Reflection.Metadata.Ecma335;

[ApiController]
public class DataLaundryController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public DataLaundryController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }


    [HttpGet("datalaundry/GetAllDataLaundrys")]
    public IActionResult GetAllDataLaundrys()
    {
        try
        {
            response.status = 200;
            response.message = "berhasil menampilkan data datalaundrys";
            response.data = _dbManager.GetAllDataLaundrys();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    // [HttpGet("datalaundry/GetDataLaundryById")]
    // public IActionResult GetDataLaundrysById(int id)
    // {
    //     var datalaundryinfo = _dbManager.GetDataLaundrysById(id);
    //     if (datalaundryinfo == null)
    //     {
    //         return NotFound();
    //     }
    //     return Ok(datalaundryinfo);
    // }

    [HttpPost("datalaundry/GetPostDataLaundrys")]
    public IActionResult CreateDataLaundry([FromBody] DataLaundry datalaundry)
    {
        try
        {
            response.status = 200;
            response.message = "berhasil menambah data datalaundrys";
            _dbManager.CreateDataLaundry(datalaundry);
        }
        catch (Exception ex)
        {
            response.status =500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
   
}