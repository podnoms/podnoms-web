using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.Extensions.Options;
using PodNoms.Api.Services.Auth;

namespace PodNoms.Api.Models {
    public class ChatMessage : BaseModel {
        public int Id { get; set; }

        public int? FromUserId { get; set; }
        public ApplicationUser FromUser { get; set; }
        public int? ToUserId { get; set; }
        public DateTime? Seen { get; set; }
        public ApplicationUser ToUser { get; set; }
    }
}
