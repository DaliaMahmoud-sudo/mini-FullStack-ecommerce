using E_Commerce.APIs.Entities;
using E_Commerce.Repository.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using E_Commerce.Core.Repositories;

namespace E_Commerce.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepo;

        public ProductsController(IGenericRepository<Product> ProductRepo)
        {
           
            _productRepo = ProductRepo;
        }

        // US-01 Create Product
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            if (product.Price <= 0)
                return BadRequest("Price must be greater than 0.");

            if (product.Quantity < 0)
                return BadRequest("Quantity must be >= 0.");

            // Check if product already exists by name
            var existingProduct = await _productRepo.GetAllAsync();
            var found = existingProduct.FirstOrDefault(p => p.Name.ToLower() == product.Name.ToLower());

            if (found != null)
            {
                // Update existing product
                found.Price = product.Price;
                found.Quantity = product.Quantity;

                _productRepo.UpdateAsync(found);

                return Ok(new
                {
                    message = "Product updated successfully",
                    product = found
                });
            }

            // Create new product
             _productRepo.AddAsync(product);

            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        // US-02 List Products
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepo.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productRepo.GetByIdAsync(id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }
    }
}
