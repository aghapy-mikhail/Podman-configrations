
## What is Podman??

Podman is a daemon-less container engine for developing, managing, and running OCI Containers on your Linux System. Containers can either be run as root or in rootless mode.

<!-- ![Podman](https://s3.ap-south-1.amazonaws.com/akash.r/Devops_Notes_screenshots/Docker/Podman.png) -->

<div style="text-align:center" >
<img src="https://s3.ap-south-1.amazonaws.com/akash.r/Devops_Notes_screenshots/Docker/Podman.png" alt="drawing" width="300" height="400"/>
</div>

---

## Docker VS Podman

- Daemonless - Docker is built on top of runC runtime container runtime, which runs a docker daemon to execute tasks. Podman is light-weight and doesn’t require an always running instance for running containers, It is directly using the runC runtime container.
- Rootless - Podman can be run as either root or non-root. We can run podman containers as non-root user and still be working with running containers, but docker daemon need to run sudo.
- Pods — The term Pods originated from Kubernetes. Pods are a collections of containers which are run as close as possible. Podman provides this feature out of the box for running multiple containers together.
- Image & Containers Location:
  - Docker: /var/lib/docker
  - Podman ( root ): /var/lib/containers
  - Podman ( normal_user ): ~/.local/share/containers

---

## Install Podman as Rootless

### To run podman as rootless:

- Prerequisites
 - Enable cgroups v2
 - To allow rootless operation of Podman containers, first determine which user(s) and group(s) you want to use for the containers, and then add their corresponding entries to /etc/subuid and /etc/subgid respectively.

---

#### 1.0 Enable cgroupsv2

```bash
================================================================================================
Enable cgroups v2
================================================================================================
# Enable This Kernel Paramater
$ echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/userns.conf
# Edit grub
# Use one of them:
- systemd.unified_cgroup_hierarchy=1 - Systemd will mount /sys/fs/cgroup as cgroup v2
- cgroup_no_v1="all" - The kernel will disable all v1 cgroup controllers
---
$ sudo vim /etc/default/grub
GRUB_CMDLINE_LINUX_DEFAULT=".... systemd.unified_cgroup_hierarchy=1 --or-- cgroup_no_v1="all""
---
# Manual Method
$ mount -t cgroup2 none /sys/fs/cgroup
# To Check
# For V2
$ ls /sys/fs/cgroup
cgroup.controllers      cgroup.subtree_control  init.scope/      system.slice/
cgroup.max.depth        cgroup.threads          io.cost.model    user.slice/
cgroup.max.descendants  cpu.pressure            io.cost.qos
cgroup.procs            cpuset.cpus.effective   io.pressure
cgroup.stat             cpuset.mems.effective   memory.pressure
# V1 ( if you see these file then your cgroup is on v1 )
$ ls /sys/fs/cgroup
blkio/    cpu,cpuacct/  freezer/  net_cls@           perf_event/  systemd/
cpu@      cpuset/       hugetlb/  net_cls,net_prio/  pids/        unified/
cpuacct@  devices/      memory/   net_prio@          rdma/
# Update

$ cat /etc/default/grub 
$ sudo readlink -e /etc/grub2.cfg 
$ sudo grub2-mkconfig --output /boot/grub2/grub.cfg

$ sudo grub-mkconfig -o /boot/grub/grub.cfg
$ reboot
```

#### 2.0 Enable Uid'ss and Gid's for User

```bash
================================================================================================
User Specification
================================================================================================
# The following below commands enables the podman user and group to run Podman containers (or other types of containers in that case).
# It allocates the UIDs and GIDs from 100000to 165535 to the podman user and group respectively.
$ sudo touch /etc/{subgid,subuid}
$ sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 {USER}
$ grep {USER} /etc/subuid /etc/subgid
/etc/subuid:{USER}:100000:65536
/etc/subgid:{USER}:100000:65536
```

---

### Install Podman

```bash
================================================================================================
Install Podman
================================================================================================
$ sudo pacman -S podman crun cockpit-podman
# cockpit-podman : supports podman containers in cockpit
$ podman system migrate
$ podman --version
podman version 2.1.1
================================================================================================
Add Registries
================================================================================================
$ sudo vim /etc/containers/registries.conf
[registries.search]
registries = ['docker.io', 'registry.fedoraproject.org', 'quay.io', 'registry.access.redhat.com', 'registry.centos.org']
```

---


### Redhat login subscription-manager register

```bash

podman login registry.redhat.io 
Username: ********
Password: **********

```

### Basic Podman Commands

```bash
# Podman commands are same as docker commands: ( It some of new commands like podman system )
  attach      Attach to a running container
  auto-update Auto update containers according to their auto-update policy
  build       Build an image using instructions from Containerfiles
  commit      Create new image based on the changed container
  container   Manage containers
  cp          Copy files/folders between a container and the local filesystem
  create      Create but do not start a container
  diff        Display the changes to the object's file system
  events      Show podman events
  exec        Run a process in a running container
  export      Export container's filesystem contents as a tar archive
  generate    Generate structured data based on containers and pods.
  healthcheck Manage health checks on containers
  help        Help about any command
  history     Show history of a specified image
  image       Manage images
  images      List images in local storage
  import      Import a tarball to create a filesystem image
  info        Display podman system information
  init        Initialize one or more containers
  inspect     Display the configuration of object denoted by ID
  kill        Kill one or more running containers with a specific signal
  load        Load an image from container archive
  login       Login to a container registry
  logout      Logout of a container registry
  logs        Fetch the logs of one or more containers
  manifest    Manipulate manifest lists and image indexes
  mount       Mount a working container's root filesystem
  network     Manage networks
  pause       Pause all the processes in one or more containers
  play        Play a pod and its containers from a structured file.
  pod         Manage pods
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image from a registry
  push        Push an image to a specified destination
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Removes one or more images from local storage
  run         Run a command in a new container
  save        Save image(s) to an archive
  search      Search registry for image
  start       Start one or more containers
  stats       Display a live stream of container resource usage statistics
  stop        Stop one or more containers
  system      Manage podman
  tag         Add an additional name to a local image
  top         Display the running processes of a container
  unmount     Unmounts working container's root filesystem
  unpause     Unpause the processes in one or more containers
  unshare     Run a command in a modified user namespace
  untag       Remove a name from a local image
  version     Display the Podman Version Information
  volume      Manage volumes
  wait        Block on one or more containers
---
# Podman System Commands
  connection  Manage remote ssh destinations
  df          Show podman disk usage
  info        Display podman system information
  migrate     Migrate containers
  prune       Remove unused data
  renumber    Migrate lock numbers
  reset       Reset podman storage
  service     Run API service
# Ex:
# You can add another podman server like this:
$ podman system connection add server2 ssh://user@ip
# Show podman space usage
$ podman systemd df
TYPE           TOTAL   ACTIVE  SIZE     RECLAIMABLE
Images         4       4       1.024GB  0B (0%)
Containers     4       0       495.4kB  495.4kB (100%)
Local Volumes  3       0       246.6kB  66.34kB (0%)
```

---

