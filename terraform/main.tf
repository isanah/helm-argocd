provider "google" {
  project = "chromatic-idea-422815-v2"
  region  = "us-central1"
}

resource "google_container_cluster" "gke_cluster" {
  name     = "my-gke-cluster"
  location = "us-central1"

  initial_node_count = 3

  node_config {
    machine_type = "e2-medium"
  }
}

output "cluster_name" {
  value = google_container_cluster.gke_cluster.name
}
