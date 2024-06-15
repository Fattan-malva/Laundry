using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Ocsp;
using System;
using System.Reflection.Metadata.Ecma335;

[ApiController]
public class UnitController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public UnitController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }


    [HttpGet("unit/GetAllUnits")]
    public IActionResult GetAllUnits()
    {
        try
        {
            response.status = 200;
            response.message = "berhasil menampilkan data units";
            response.data = _dbManager.GetAllUnits();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpGet("unit/GetUnitById")]
    public IActionResult GetUnitsById(int id)
    {
        var unitinfo = _dbManager.GetUnitsById(id);
        if (unitinfo == null)
        {
            return NotFound();
        }
        return Ok(unitinfo);
    }

    [HttpPost("unit/GetPostUnits")]
    public IActionResult CreateUnit([FromBody] Unit unit)
    {
        try
        {
            response.status = 200;
            response.message = "berhasil menambah data units";
            _dbManager.CreateUnit(unit);
        }
        catch (Exception ex)
        {
            response.status =500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpPut("unit/GetUpdateUnit")]
    public IActionResult UpdateUnit(int id,[FromBody] Unit unit)
    {
        try
        {
            unit.id = id;
            response.status = 200;
            response.message = "berhasil mengupdate data units";
            _dbManager.UpdateUnit(unit);
        }
        catch (Exception ex)
        {
            response.status =  500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpDelete("unit/DeleteUnit")]
    public IActionResult DeleteUnit(int id)
    {
        try{
            response.status = 200;
            response.message = "berhasil menghapus data units";
            _dbManager.DeleteUnit(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message =ex.Message;
        }
        return Ok(response);
    }

}