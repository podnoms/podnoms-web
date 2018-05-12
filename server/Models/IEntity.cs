using System;

namespace PodNoms.Api.Models {
    public interface IEntity {
        int Id { get; set; }
        // TODO replace Id with below
        string Uid { get; set; }
        Guid NewId { get; set; }
        DateTime CreateDate { get; set; }
        DateTime UpdateDate { get; set; }
    }
}