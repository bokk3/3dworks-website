# Nginx Proxy Manager Configuration for 3Dworks

## Issue
If you're seeing the NPM welcome page instead of the site, it's usually because:
1. Next.js is checking the Host header and rejecting/redirecting requests
2. NPM is not forwarding headers correctly
3. The proxy configuration is incorrect

## NPM Proxy Host Configuration

### Basic Settings
- **Domain Names**: `3dworks.truyens.pro` (or your domain)
- **Scheme**: `https` (or `http` for testing)
- **Forward Hostname/IP**: `3dworks-web` (container name) or the container's internal IP
- **Forward Port**: `3000` (internal port, NOT 3008)
- **Forward Scheme**: `http` (always use http for internal communication)
- **Block Common Exploits**: ✅ Enabled
- **Websockets Support**: ✅ Enabled (if needed)

### Advanced Tab - Custom Nginx Configuration

Add this custom configuration in the **Advanced** tab of your NPM proxy host:

```nginx
# Forward the correct Host header
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port $server_port;

# Disable buffering for better performance
proxy_buffering off;
proxy_request_buffering off;

# Increase timeouts
proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;

# Don't redirect on errors
proxy_redirect off;
```

### SSL Tab
- **SSL Certificate**: Use a valid SSL certificate (Let's Encrypt recommended)
- **Force SSL**: ✅ Enabled
- **HTTP/2 Support**: ✅ Enabled
- **HSTS Enabled**: ✅ Enabled (optional)

## Troubleshooting

### 1. Test Direct Connection
```bash
# From NPM container, test if you can reach the app
docker exec -it <npm-container> curl http://3dworks-web:3000
```

### 2. Check Container Logs
```bash
docker logs 3dworks-web
```

### 3. Verify Network Connection
```bash
# Check if container is on the network
docker network inspect rein-staging-network | grep 3dworks-web
```

### 4. Test Health Endpoint
```bash
# From NPM container
docker exec -it <npm-container> curl http://3dworks-web:3000/api/health
```

### 5. Common Issues

**Issue**: Still seeing NPM welcome page
- **Solution**: Make sure you're using the container name `3dworks-web` (not `localhost` or `127.0.0.1`)
- **Solution**: Verify the port is `3000` (internal port, not the exposed `3008`)

**Issue**: 502 Bad Gateway
- **Solution**: Check if the container is running: `docker ps | grep 3dworks-web`
- **Solution**: Check container logs for errors
- **Solution**: Verify the network connection

**Issue**: Redirect loops
- **Solution**: Make sure `Forward Scheme` is set to `http` (not `https`)
- **Solution**: Check the custom Nginx config above is applied

**Issue**: Wrong content or 404
- **Solution**: Verify `NEXT_PUBLIC_BASE_URL` is set correctly in docker-compose.prod.yml
- **Solution**: Make sure the Host header is being forwarded (see custom config above)

## Verification

After configuration, test:
1. Visit `https://3dworks.truyens.pro` - should show the site
2. Visit `https://3dworks.truyens.pro/api/health` - should return JSON
3. Check browser console for any errors
4. Check NPM access logs for successful connections

