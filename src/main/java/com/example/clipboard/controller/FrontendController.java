import org.springframework.core.io.ClassPathResource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/")
public class FrontendController {
    @GetMapping("/**")
    public ResponseEntity<ClassPathResource> getStaticFile(@RequestParam("path") String path) throws IOException {
        ClassPathResource resource = new ClassPathResource("frontend/dist/" + path);

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .cacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .body(resource);
    }
}

