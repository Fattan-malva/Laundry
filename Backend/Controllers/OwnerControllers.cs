using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Ocsp;
using System;
using System.Reflection.Metadata.Ecma335;

[ApiController]
public class OwnerController : ControllerBase
{
    private readonly DbManager _dbManager;
    Response response = new Response();
    public OwnerController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    //Getall Owner=========================================================
    [HttpGet("owner/GetAllOwners")]
    public IActionResult GetAllOwners()
    {
        try
        {
            response.status = 200;
            response.message = "berhasil menampilkan data owners";
            response.data = _dbManager.GetAllOwners();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpGet("owner/GetOwnerById")]
    public IActionResult GetOwnersById(int id)
    {
        var ownerinfo = _dbManager.GetOwnersById(id);
        if (ownerinfo == null)
        {
            return NotFound();
        }
        return Ok(ownerinfo);
    }

    [HttpPost("owner/GetPostOwners")]
    public IActionResult CreateOwner([FromBody] Owner owner)
    {
        try
        {
            response.status = 200;
            response.message = "berhasil menambah data owners";
            _dbManager.CreateOwner(owner);
        }
        catch (Exception ex)
        {
            response.status =500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpPut("owner/GetUpdateOwner")]
    public IActionResult UpdateOwner(int id,[FromBody] Owner owner)
    {
        try
        {
            owner.id = id;
            response.status = 200;
            response.message = "berhasil mengupdate data owners";
            _dbManager.UpdateOwner(owner);
        }
        catch (Exception ex)
        {
            response.status =  500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    [HttpDelete("owner/DeleteOwner")]
    public IActionResult DeleteOwner(int id)
    {
        try{
            response.status = 200;
            response.message = "berhasil menghapus data owners";
            _dbManager.DeleteOwner(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message =ex.Message;
        }
        return Ok(response);
    }

}