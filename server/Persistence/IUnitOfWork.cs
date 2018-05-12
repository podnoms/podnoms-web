using System;
using System.Threading.Tasks;

namespace PodNoms.Api.Persistence
{
    public interface IUnitOfWork
    {
        Task<bool> CompleteAsync();
    }
}