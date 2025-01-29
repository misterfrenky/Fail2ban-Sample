Vagrant.configure("2") do |config|
  config.vm.box = "darkwizard242/ubuntu2004"
  config.vm.network "private_network", ip: "192.168.56.209"
  config.vm.synced_folder "./data", "/vagrant_data"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt update -y
    sudo apt install vim -y
    sudo apt install curl -y
    sudo apt install net-tools -y
    sudo apt install nginx -y
    sudo apt install git -y
    sudo apt install fail2ban -y
    sudo apt install iptables -y

    sudo rm -rf /etc/nginx/sites-enabled/default
    sudo cp -rf /vagrant_data/nginx/sites-enabled/* /etc/nginx/sites-enabled/
    sudo nginx -s reload

    sudo cp -rf /vagrant_data/fail2ban-data/filter.d/* /etc/fail2ban/filter.d/
    sudo cp -rf /vagrant_data/fail2ban-data/action.d/* /etc/fail2ban/action.d/
    sudo cp -rf /vagrant_data/fail2ban-data/*.conf /etc/fail2ban/

    sudo cp -if /vagrant_data/fail2ban-data/jail.d/* /etc/fail2ban/jail.d/
    sudo rm -rf /etc/fail2ban/jail.d/defaults-debian.conf
    sudo service fail2ban restart

    sudo rm -rf /var/www/html
    sudo git clone https://github.com/Fyrestrap/fyrestrap-tw-coming-soon /var/www/html

  SHELL
  config.vm.define "fail2ban" do |vmconf|
   vmconf.vm.box = "darkwizard242/ubuntu2004"
   vmconf.vm.hostname = 'fail2ban.local'
   config.hostsupdater.aliases = ["fail2ban.local", "h1.fail2ban.local", "h2.fail2ban.local", "h3.fail2ban.local"]
  end
end
