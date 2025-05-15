package com.atacanyavuz.ticketing.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTUtils {
    private SecretKey secretKey;
    private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15; // 15 Mins
    private static final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24; // 24 Hours

    public JWTUtils(){
        String secreteString = "UpQccX9hDdnGz5SpmW3ZTlBTKssEo9U3ULQGy6ONg/EgvpVjEjMEqz5eNw47RJtObnEt1wC3cJH6WXzS1Fiz6g==";
        byte[] keyBytes = Base64.getDecoder().decode(secreteString);
        this.secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    private String createToken(Map<String, Object> claims, String subject, long expirationMs) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(this.secretKey)
                .compact();
    }

    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userDetails.getAuthorities().iterator().next().getAuthority());
        return createToken(claims, userDetails.getUsername(), ACCESS_TOKEN_EXPIRATION);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return createToken(new HashMap<>(), userDetails.getUsername(), REFRESH_TOKEN_EXPIRATION);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver){
        return claimsResolver.apply(Jwts.parser().verifyWith(this.secretKey).build().parseSignedClaims(token).getPayload());
    }

    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = extractClaims(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
