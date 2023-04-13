package com.startup.startupProject.Service;

import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import javax.sound.sampled.*;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@Service
public class WavToRaw {

    private static final AudioFormat FORMAT = new AudioFormat(
            16_000, // 16 kHz, sampleRate
            16, // 16 bits, sampleSizeInBits
            1, // Mono, int channels
            true, // Signed
            false // Little endian, True is BigEndian
    );

    public WavToRaw() {
        super();
    }

    public void SaveRaw(String audioName, File file) throws UnsupportedAudioFileException {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            String fileName = "src/main/resources/audio/"+dateFormat.format(new Date()) + ".raw";
            OutputStream output = new FileOutputStream(fileName);

            output.write(formatWavToRaw(changeFormat(AudioToByte(file), FORMAT)));
            output.flush();
            output.close();

            System.out.print("Success");

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public byte[] formatWavToRaw(@NotNull final byte[] audioFileContent) {
        return Arrays.copyOfRange(audioFileContent, 44, audioFileContent.length);
    }

    public byte[] changeFormat(@NotNull final byte[] audioFileContent, @NotNull final AudioFormat audioFormat)
            throws IOException, UnsupportedAudioFileException {
        try (final AudioInputStream originalAudioStream = AudioSystem
                .getAudioInputStream(new ByteArrayInputStream(audioFileContent));
             final AudioInputStream formattedAudioStream = AudioSystem.getAudioInputStream(audioFormat,
                     originalAudioStream);
             final AudioInputStream lengthAddedAudioStream = new AudioInputStream(formattedAudioStream, audioFormat,
                     audioFileContent.length);
             final ByteArrayOutputStream convertedOutputStream = new ByteArrayOutputStream()) {
            AudioSystem.write(lengthAddedAudioStream, AudioFileFormat.Type.WAVE, convertedOutputStream);
            return convertedOutputStream.toByteArray();
        }
    }

    public byte[] AudioToByte(File file) {
        try (FileInputStream fstream = new FileInputStream(file);
             BufferedInputStream in = new BufferedInputStream(fstream);
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            int read;
            byte[] buff = new byte[1024];
            while ((read = in.read(buff)) > 0) {
                out.write(buff, 0, read);
            }
            return out.toByteArray();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return new byte[0];
    }
}