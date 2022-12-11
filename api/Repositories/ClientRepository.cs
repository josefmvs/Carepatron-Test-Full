using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public interface IClientRepository
    {
        Task<Client[]> Get();
        Task<Client[]> Search(string name);
        Task<Client?> GetOne(string id);
        Task Create(Client client);
        Task Update(Client client);
    }

    public class ClientRepository : IClientRepository
    {
        private readonly DataContext dataContext;

        public ClientRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task Create(Client client)
        {
            await dataContext.AddAsync(client);
            await dataContext.SaveChangesAsync();
        }

        public Task<Client[]> Get()
        {
            return dataContext.Clients.ToArrayAsync();
        }

        public Task<Client[]> Search(string name)
        {
            return dataContext.Clients.Where( a => a.LastName.ToLower().Contains(name.ToLower()) || a.FirstName.ToLower().Contains(name.ToLower()) ).ToArrayAsync();
        }

        public Task<Client?> GetOne(string id)
        {
            return dataContext.Clients.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task Update(Client client)
        {
            var existingClient = await dataContext.Clients.FirstOrDefaultAsync(x => x.Id == client.Id);

            if (existingClient == null)
                return;

            existingClient.FirstName = client.FirstName;
            existingClient.LastName = client.LastName;
            existingClient.Email = client.Email;
            existingClient.PhoneNumber = client.PhoneNumber;

            await dataContext.SaveChangesAsync();
        }
    }
}

